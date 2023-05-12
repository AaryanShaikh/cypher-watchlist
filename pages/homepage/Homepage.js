import React, { useState, useEffect, useRef } from 'react'
import { Input, Menu, Switch, Typography } from 'antd'
import { GiPopcorn, GiAbstract060, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay } from 'react-icons/bi'
import { BsMoonStars, BsFillSunFill } from 'react-icons/bs';
import CardItem from '../../components/Card';
import rawData from "../../data/rawData.json"

const { Text } = Typography
const { Search } = Input

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const webListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "89vh", padding: "10px 5px", transition: ".5s ease-in-out" }
    const mobListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "83vh", padding: "10px 5px" }
    const [isDark, setisDark] = useState(true)

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])



    return (<>
        <div ref={widthRef} style={{ position: "absolute", width: "100%" }}></div>
        <div className='heading' style={{ background: !isDark ? "#1b1b1b" : "white" }}>
            <Text style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }} className='logo'>{range ? "CW" : "Cypher's WatchList"}</Text>
            <Search className={!isDark ? "dark" : ""} style={{ width: range ? "55%" : "25%" }} placeholder={range ? "Search here" : "Try searching Anime, Series or Movie name"} />
            <Switch checked={isDark} onChange={(e) => setisDark(e)} checkedChildren={<BsFillSunFill />} unCheckedChildren={<BsMoonStars />} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "column" : "row", gap: "5px", background: !isDark ? "#1b1b1b" : "white" }}>
            <Menu
                style={{ width: range ? "100%" : "150px", background: !isDark ? "#1b1b1b" : "white", color: !isDark ? "white" : "black" }}
                mode={range ? "horizontal" : "inline"}
                inlineCollapsed={false}
                selectedKeys={categorySel}
            >
                <Menu.Item key="all" onClick={() => setcategorySel("all")} icon={<GiPopcorn style={{ fontSize: "20px" }} />}>{range ? "" : "All"}</Menu.Item>
                <Menu.Item key="ongoing" onClick={() => setcategorySel("ongoing")} icon={<GiTv style={{ fontSize: "20px" }} />}>{range ? "" : "Ongoing"}</Menu.Item>
                <Menu.Item key="anime" onClick={() => setcategorySel("anime")} icon={<GiAbstract060 style={{ fontSize: "20px" }} />}>{range ? "" : "Anime"}</Menu.Item>
                <Menu.Item key="series" onClick={() => setcategorySel("series")} icon={<BiMoviePlay style={{ fontSize: "20px" }} />}>{range ? "" : "Series"}</Menu.Item>
                <Menu.Item key="movies" onClick={() => setcategorySel("movies")} icon={<BiCameraMovie style={{ fontSize: "20px" }} />}>{range ? "" : "Movies"}</Menu.Item>
            </Menu>
            <div className='scrollVisible' style={range ? mobListStyle : webListStyle}>
                {
                    rawData.map((ele, ind) => {
                        return <CardItem key={ind} dark={!isDark} range={range} show={(ele.status == "in progress" && categorySel == "ongoing") || categorySel == "all" || ele.category == categorySel} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                    })
                }
            </div>
        </div>
    </>
    )
}

export default Homepage