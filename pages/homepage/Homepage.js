import React, { useState, useEffect, useRef } from 'react'
import { Input, Typography } from 'antd'

const { Text } = Typography
const { Search } = Input

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500 

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    return (<>
        <div ref={widthRef} style={{ position: "absolute", width: "100%" }}></div>
        <div className='heading'>
            <Text className='logo'>{range ? "CW" : "Cypher's WatchList"}</Text>
            <Search style={{ width: range ? "55%" : "25%" }} placeholder='Try searching Anime, Series or Movie name' />
        </div>
    </>
    )
}

export default Homepage