import './Days.scss';

interface DayBarProps {
    day: number;
    barHeight: string;
}

const DayBar: React.FC<DayBarProps> = ({ day, barHeight }) => {
    return (
        <div key={day} className="day">
            <div
                className='bar'
                style={{ height: barHeight }}
            ></div>

            <div className="day-number">{day}</div>
        </div>
    );
}

export default DayBar;