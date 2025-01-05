import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface ChartData {
  rapid: { count: number; percentage: number };
  blitz: { count: number; percentage: number };
  bullet: { count: number; percentage: number };
}

interface MonthlyData {
  distribution: Array<{
    month: string;
    rapid: number;
    blitz: number;
    bullet: number;
    total: number;
  }>;
}

interface RatingData {
  [format: string]: Array<{
    date: string;
    rating: number;
  }>;
}

interface TimeData {
  morning: { games: number; winRate: number };
  afternoon: { games: number; winRate: number };
  evening: { games: number; winRate: number };
  night: { games: number; winRate: number };
}

interface ResultsData {
  wins: { total: number };
  draws: { total: number };
  losses: { total: number };
}

// Format number with commas
const formatNumber = (num: number) => num.toLocaleString();

// Format percentage
const formatPercent = (decimal: number) => `${Math.round(decimal * 100)}%`;

// Custom tooltip styles
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a1628]/95 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2 shadow-lg">
        <p className="text-white/90 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-white/70">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Format breakdown chart
export const FormatBreakdown = ({ data }: { data: ChartData }) => {
  const formatData = [
    { name: 'Rapid', value: data.rapid.count, percentage: data.rapid.percentage },
    { name: 'Blitz', value: data.blitz.count, percentage: data.blitz.percentage },
    { name: 'Bullet', value: data.bullet.count, percentage: data.bullet.percentage }
  ];

  const COLORS = ['#60A5FA', '#34D399', '#F87171'];

  return (
    <div className="w-full aspect-square max-w-[300px] mx-auto relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {formatData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            {formatNumber(data.rapid.count + data.blitz.count + data.bullet.count)}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/60"
          >
            Total Games
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
        {formatData.map((format, index) => (
          <div key={format.name} className="text-center">
            <div className="text-sm font-medium" style={{ color: COLORS[index] }}>
              {format.name}
            </div>
            <div className="text-xs text-white/60">
              {formatPercent(format.percentage / 100)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Monthly games distribution
export const MonthlyDistribution = ({ data }: { data: MonthlyData }) => {
  const monthlyData = data.distribution.map((month) => ({
    name: month.month,
    rapid: month.rapid,
    blitz: month.blitz,
    bullet: month.bullet,
    total: month.total
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rapid" stackId="a" fill="#60A5FA" />
          <Bar dataKey="blitz" stackId="a" fill="#34D399" />
          <Bar dataKey="bullet" stackId="a" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Rating progress chart
export const RatingProgress = ({ data, format }: { data: RatingData; format: 'rapid' | 'blitz' | 'bullet' }) => {
  const ratingData = data[format].map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    rating: entry.rating
  }));

  const minRating = Math.min(...ratingData.map(d => d.rating));
  const maxRating = Math.max(...ratingData.map(d => d.rating));
  const padding = Math.round((maxRating - minRating) * 0.1);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={ratingData}>
          <defs>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            domain={[minRating - padding, maxRating + padding]}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="rating" 
            stroke="#60A5FA" 
            fill="url(#ratingGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Time of day heatmap
export const PlayingPatterns = ({ data }: { data: TimeData }) => {
  const timeData = [
    { name: 'Morning', value: data.morning.games, winRate: data.morning.winRate },
    { name: 'Afternoon', value: data.afternoon.games, winRate: data.afternoon.winRate },
    { name: 'Evening', value: data.evening.games, winRate: data.evening.winRate },
    { name: 'Night', value: data.night.games, winRate: data.night.winRate }
  ];

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={timeData} layout="vertical">
          <XAxis 
            type="number"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#60A5FA">
            {timeData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`rgba(96, 165, 250, ${0.3 + (entry.winRate / 100) * 0.7})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Results breakdown
export const ResultsBreakdown = ({ data }: { data: ResultsData }) => {
  const resultsData = [
    { name: 'Wins', value: data.wins.total },
    { name: 'Draws', value: data.draws.total },
    { name: 'Losses', value: data.losses.total }
  ];

  const COLORS = ['#34D399', '#60A5FA', '#F87171'];

  return (
    <div className="w-full aspect-square max-w-[300px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={resultsData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {resultsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}; 