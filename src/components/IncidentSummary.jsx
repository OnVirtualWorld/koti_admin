import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axiosInstance from '../utils/axiosInstance';

const RADIAN = Math.PI / 180;

// Constants for Gauge chart
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const IncidentSummary = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [gaugeChartData, setGaugeChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Needle calculation
  const needle = (value, total, cx, cy, iR, oR, color) => {
    const ang = 180 * (1 - value / total); // calculate the angle of the needle
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5; // Needle radius
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke='none' />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke='none'
        fill={color}
      />,
    ];
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch line chart data
      const lineResponse = await axiosInstance.get('/dashboard/data/line-data');
      if (lineResponse.data.success) {
        setLineChartData(lineResponse.data.data);
      }

      // Fetch pie chart data
      const pieResponse = await axiosInstance.get(`/dashboard/data/pie-data`);
      if (pieResponse.data.success) {
        const cleanedData = pieResponse.data.data.map((item) => ({
          ...item,
          name:
            !item.name || item.name.toLowerCase() === 'undefined'
              ? 'Others'
              : item.name,
          value: parseFloat(item.value.toFixed(2)), // ⬅️ formatted here
        }));
        setPieChartData(cleanedData);
      }

      // Fetch gauge chart data
      const gaugeResponse = await axiosInstance.get(
        '/dashboard/data/gauge-data'
      );
      if (gaugeResponse.data.success) {
        setGaugeChartData(gaugeResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Extract data for the needle and gauge chart
  const gaugeTotal = gaugeChartData.length ? gaugeChartData[0].total : 0;
  const gaugeAverage = gaugeChartData.length ? gaugeChartData[0].average : 0;
  const gaugeHours = gaugeChartData.length ? gaugeChartData[0].hour : 0;

  return (
    <div className='bg-blue-100'>
      <div className='p-6 container'>
        <h2 className='text-2xl font-bold text-blue-800 mb-6'>
          Incident Summary
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Line Chart */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='bg-blue-800 text-white text-center py-2 rounded-t-lg'>
              <h3>Total incidents reported over time</h3>
            </div>
            <div className='py-20'>
              <ResponsiveContainer width='100%' height={250}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='incidents'
                    stroke='#007bff'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='bg-blue-800 text-white text-center py-2 rounded-t-lg'>
              <h3>Common incident types breakdown</h3>
            </div>
            <div className='grid grid-cols-6'>
              <div className='col-span-6 md:col-span-4 pt-20'>
                <ResponsiveContainer width='100%' height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      outerRadius={100}
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? 'green'
                              : index === 1
                              ? 'blue'
                              : index === 2
                              ? 'red'
                              : 'orange'
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className='flex flex-col items-start justify-center gap-2 col-span-6 md:col-span-2'>
                {pieChartData.map((p, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <div
                      className='w-8 h-8'
                      style={{
                        backgroundColor:
                          index === 0
                            ? 'green'
                            : index === 1
                            ? 'blue'
                            : index === 2
                            ? 'red'
                            : 'orange',
                      }}
                    ></div>
                    <p>{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gauge Chart with Needle */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='bg-blue-800 text-white text-center py-2 rounded-t-lg'>
              <h3>Average resolution time for incidents</h3>
            </div>
            <ResponsiveContainer width='100%' height={250}>
              <p className='text-center mt-6 font-bold'>
                AVERAGE RESOLUTION TIME
              </p>
              <div className='flex items-center justify-center'>
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey='value'
                    startAngle={180}
                    endAngle={0}
                    data={[
                      { value: gaugeAverage, color: '#007bff' },
                      { value: gaugeTotal - gaugeAverage, color: '#ddd' },
                    ]}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill='#8884d8'
                    stroke='none'
                  >
                    {[{ color: '#007bff' }, { color: '#ddd' }].map(
                      (entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                  {needle(gaugeAverage, gaugeTotal, cx, cy, iR, oR, '#d0d000')}
                </PieChart>
              </div>
            </ResponsiveContainer>
            <p className='text-center font-bold text-xl mt-0'>
              {gaugeHours} Hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentSummary;
