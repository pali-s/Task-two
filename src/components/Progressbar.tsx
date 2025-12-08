const Progressbar = ({
    value = 0,
    total = 100,
    barColor = 'bg-blue-600',
    bgColor = 'bg-gray-200',
    height = 'h-3',
    showLabel='true'
}) => {
    const percentage = Math.min(100, Math.max(0, (value / total) * 100));
    return (
        <div className='w-full flex items-center gap-3'>
        <div className={`flex-1 ${bgColor} rounded-full ${height}`}>
            <div
                className={`${barColor} ${height} rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
        {showLabel && (
            <span className='text-sm font-medium whitespace-nowrap'>
                {value} of {total}
            </span>
        )}
        </div>
    )
}

export default Progressbar