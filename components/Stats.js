import React, { useState } from 'react'
import { motion } from "framer-motion";
import NumberCounter from './NumberCounter';
import { BiScatterChart } from 'react-icons/bi';

const Stats = ({ range, rawData }) => {
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 35,
    };
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <div className='stats-wrapper'>
            <motion.div
                layout
                transition={spring}
                className='stats'
                data-ison={isOn}
                onClick={toggleSwitch}
            >
                {
                    isOn ? <>
                        <NumberCounter range={range} title="Total [All] Watched" end={rawData.length - rawData.filter(x => x.category == "game").length} />
                        <NumberCounter range={range} title="Total Games Completed" end={rawData.filter(x => x.category == "game").length} />
                        <NumberCounter range={range} title="Total Anime Watched" end={rawData.filter(x => x.category == "anime").length} />
                        <NumberCounter range={range} title="Total [Anime Eps] Watched" end={rawData.filter(x => x.category == "anime").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                        <NumberCounter range={range} title="Total Series Watched" end={rawData.filter(x => x.category == "series").length} />
                        <NumberCounter range={range} title="Total [Series Eps] Watched" end={rawData.filter(x => x.category == "series").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                        <NumberCounter range={range} title="Total Movies Watched" end={rawData.filter(x => x.category == "movies").length} />
                        <NumberCounter range={range} title="Total Currently Watching" end={rawData.filter(x => x.status == "in progress").length} />
                    </> : ""
                }
                <BiScatterChart style={{ opacity: isOn ? 0 : 1, transition: ".5s ease", position: "absolute" }} />
            </motion.div>
        </div>
    )
}

export default Stats