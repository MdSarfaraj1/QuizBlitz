import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Generate realistic mock data with fewer categories that actually have attempts
const generateRealisticData = () => {
  const activeCategories = [
    { category: 'JavaScript', quizzesTaken: 28, difficulty: 'Intermediate' },
    { category: 'React', quizzesTaken: 23, difficulty: 'Advanced' },
    { category: 'Python', quizzesTaken: 19, difficulty: 'Intermediate' },
    { category: 'CSS', quizzesTaken: 15, difficulty: 'Beginner' },
    { category: 'Node.js', quizzesTaken: 12, difficulty: 'Intermediate' },
    { category: 'TypeScript', quizzesTaken: 11, difficulty: 'Advanced' },
    { category: 'HTML', quizzesTaken: 8, difficulty: 'Beginner' },
    { category: 'SQL', quizzesTaken: 7, difficulty: 'Intermediate' },
    { category: 'Git', quizzesTaken: 6, difficulty: 'Beginner' },
    { category: 'Docker', quizzesTaken: 4, difficulty: 'Advanced' },
    { category: 'GraphQL', quizzesTaken: 3, difficulty: 'Advanced' },
    { category: 'AWS', quizzesTaken: 2, difficulty: 'Advanced' },
  ];

  return activeCategories;
};

const mockQuizData = generateRealisticData();

// Premium color palette
const COLORS = [
  '#4f46e5', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#d97706',
  '#059669', '#0891b2', '#1d4ed8', '#7c2d12', '#be123c', '#9333ea',
  '#0d9488', '#0369a1', '#1e40af', '#92400e', '#be185d', '#6366f1'
];

// Difficulty colors
const DIFFICULTY_COLORS = {
  'Beginner': '#10b981',
  'Intermediate': '#f59e0b', 
  'Advanced': '#ef4444'
};

const QuizProgressDashboard = ({
  quizData = mockQuizData,
  initialChartType = 'bar'
}) => {
  const [chartType, setChartType] = useState(initialChartType);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Process and filter data
  const processedData = useMemo(() => {
    let filteredData = quizData.filter(item => item.quizzesTaken > 0);
    
    if (selectedDifficulty !== 'all') {
      filteredData = filteredData.filter(item => item.difficulty === selectedDifficulty);
    }
    
    return filteredData.sort((a, b) => b.quizzesTaken - a.quizzesTaken);
  }, [quizData, selectedDifficulty]);

  const stats = useMemo(() => {
    const total = processedData.reduce((sum, item) => sum + item.quizzesTaken, 0);
    const avgPerCategory = Math.round(total / processedData.length);
    const topCategory = processedData[0];
    
    return {
      totalQuizzes: total,
      totalCategories: processedData.length,
      avgPerCategory,
      topCategory: topCategory?.category || 'None'
    };
  }, [processedData]);

  const difficultyStats = useMemo(() => {
    const stats = {};
    processedData.forEach(item => {
      if (!stats[item.difficulty]) {
        stats[item.difficulty] = 0;
      }
      stats[item.difficulty] += item.quizzesTaken;
    });
    return stats;
  }, [processedData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-gray-200/50 rounded-2xl shadow-2xl">
          <p className="font-bold text-gray-900 text-lg">{label}</p>
          <p className="text-indigo-600 font-semibold text-base mt-1">
            {payload[0].value} quizzes completed
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: DIFFICULTY_COLORS[data.difficulty] }}
            />
            <span className="text-sm text-gray-600 font-medium">{data.difficulty}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.quizzesTaken / stats.totalQuizzes) * 100).toFixed(1);
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-gray-200/50 rounded-2xl shadow-2xl">
          <p className="font-bold text-gray-900 text-lg">{data.category}</p>
          <p className="text-indigo-600 font-semibold text-base mt-1">
            {data.quizzesTaken} quizzes ({percentage}%)
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: DIFFICULTY_COLORS[data.difficulty] }}
            />
            <span className="text-sm text-gray-600 font-medium">{data.difficulty}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={Math.max(400, processedData.length * 35)}>
      <BarChart
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        barCategoryGap="20%"
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
          axisLine={{ stroke: '#cbd5e1' }}
          angle={-35}
          textAnchor="end"
          height={80}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
          axisLine={{ stroke: '#cbd5e1' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="quizzesTaken"
          fill="url(#barGradient)"
          radius={[6, 6, 0, 0]}
          className="hover:opacity-80 transition-all duration-300 cursor-pointer drop-shadow-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => percent > 0.05 ? `${category}\n${(percent * 100).toFixed(0)}%` : ''}
          outerRadius={180}
          innerRadius={70}
          fill="#8884d8"
          dataKey="quizzesTaken"
          stroke="#ffffff"
          strokeWidth={3}
        >
          {processedData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              className="hover:opacity-80 transition-opacity duration-300 cursor-pointer drop-shadow-lg"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomPieTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  if (processedData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20 text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Your Learning Journey</h3>
            <p className="text-gray-600 text-lg">Take your first quiz to begin tracking your progress!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Track your progress across {stats.totalCategories} technologies
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Quizzes</p>
                  <p className="text-4xl font-black">{stats.totalQuizzes}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">Categories</p>
                  <p className="text-4xl font-black">{stats.totalCategories}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">Average</p>
                  <p className="text-4xl font-black">{stats.avgPerCategory}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-semibold uppercase tracking-wide">Top Category</p>
                  <p className="text-lg font-black truncate">{stats.topCategory}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            Difficulty Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(difficultyStats).map(([difficulty, count]) => (
              <div 
                key={difficulty}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ backgroundColor: `${DIFFICULTY_COLORS[difficulty]}15` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: DIFFICULTY_COLORS[difficulty] }}
                  />
                  <span className="font-semibold text-gray-800">{difficulty}</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: DIFFICULTY_COLORS[difficulty] }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chart Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => setChartType("bar")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  chartType === "bar"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                📊 Bar Chart
              </button>
              <button
                onClick={() => setChartType("pie")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  chartType === "pie"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                🥧 Pie Chart
              </button>
            </div>

            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Chart */}
          <div className="bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/40 rounded-2xl p-6 border border-gray-100/50">
            {chartType === "bar" ? renderBarChart() : renderPieChart()}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-gray-500 font-medium">
            Keep learning and watch your progress grow! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizProgressDashboard;