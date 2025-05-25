import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Generate 100 categories with mock data
const generateMockData = () => {
  const categories = [
    'JavaScript', 'React', 'Python', 'CSS', 'Node.js', 'TypeScript', 'HTML', 'Java', 'C++', 'SQL',
    'MongoDB', 'Express', 'Vue.js', 'Angular', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
    'Flutter', 'Django', 'Flask', 'Spring', 'Laravel', 'Rails', 'Next.js', 'Nuxt.js', 'Svelte', 'GraphQL',
    'REST APIs', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux', 'Git', 'CI/CD', 'Testing',
    'Jest', 'Cypress', 'Selenium', 'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier', 'Sass', 'Less',
    'Bootstrap', 'Tailwind', 'Material-UI', 'Ant Design', 'Chakra UI', 'Redux', 'MobX', 'Zustand', 'Recoil', 'Context API',
    'Hooks', 'HOCs', 'Render Props', 'State Management', 'Routing', 'Authentication', 'Authorization', 'Security', 'Performance', 'Optimization',
    'Accessibility', 'SEO', 'PWA', 'Service Workers', 'WebSockets', 'Real-time', 'Microservices', 'Serverless', 'JAMstack', 'Static Sites',
  ];

  return categories.map(category => ({
    category,
    quizzesTaken: Math.floor(Math.random() * 50) + 1 // Random number between 1 and 50
  }));
};

const defaultQuizData = generateMockData();

// Colors for the pie chart - extended palette
const COLORS = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#6366f1',
  '#f43f5e', '#22d3ee', '#a3e635', '#fb923c', '#c084fc', '#4ade80',
  '#fbbf24', '#f87171', '#60a5fa', '#34d399', '#fde047', '#fb7185'
];

const QuizTakenChart = ({
  quizData = defaultQuizData,
  initialChartType = 'bar'
}) => {
  const [chartType, setChartType] = useState(initialChartType);
  const totalQuizzes = quizData.reduce((sum, item) => sum + item.quizzesTaken, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{`Quizzes: ${payload[0].value}`}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.quizzesTaken / totalQuizzes) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.category}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{`${data.quizzesTaken} quizzes (${percentage}%)`}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={quizData}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom:5,
        }}
      >
        <defs>
          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />  // Indigo-500
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8} /> // Pink-500

          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 10, fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="quizzesTaken"
          fill="url(#colorBar)"
          radius={[2, 2, 0, 0]}
          className="hover:opacity-80 transition-opacity duration-200"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={600}>
      <PieChart>
        <Pie
          data={quizData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => percent > 0.02 ? `${category} ${(percent * 100).toFixed(0)}%` : ''}
          outerRadius={200}
          fill="#8884d8"
          dataKey="quizzesTaken"
          className="outline-none"
        >
          {quizData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomPieTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    {/* heading and description */}
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
           Progress
        </h2>
        <p className="text-gray-600">
          Track your learning journey across  different
          categories
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">
              Total Quizzes Completed:
            </span>
            <span className="ml-2 text-lg font-bold text-orange-600">
              {totalQuizzes}
            </span>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Categories:</span>
            <span className="ml-2 text-lg font-bold text-green-600">
              {quizData.length}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Type Toggle buutons*/}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setChartType("bar")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === "bar"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            chartType === "pie"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Pie Chart
        </button>
      </div>

      {/* Chart Container */}
      <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200

 rounded-lg p-4 shadow-lg ">
        {chartType === "bar" ? renderBarChart() : renderPieChart()}
      </div>
    </div>
  );
};

export default QuizTakenChart;