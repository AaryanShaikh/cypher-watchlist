import React, { useState, useEffect, useRef } from 'react'
import { Input, Menu, Switch, Typography, FloatButton, Drawer, Radio, Space, Modal, Statistic, Tabs, List } from 'antd'
import { GiPopcorn, GiAbstract060, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay, BiScatterChart } from 'react-icons/bi'
import { BsMoonStars, BsFillSunFill } from 'react-icons/bs';
import { MdScreenSearchDesktop } from 'react-icons/md'
import CardItem from '../../components/Card';
// import rawData from "../../data/rawData.json"
import Loader from '../../components/Loader';
import axios from 'axios';
import SearchBox from '../../components/SearchBox';

const { Text } = Typography
const { Search } = Input
const { TabPane } = Tabs

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const [isDark, setisDark] = useState(true)
    const [isLoading, setisLoading] = useState(true)
    const [showStats, setshowStats] = useState(false)
    const [searchText, setsearchText] = useState("")
    const [rawData, setrawData] = useState([])
    const [loadingData, setloadingData] = useState("Arranging DOM elements...")
    const [iniRender, setiniRender] = useState(true)
    const [viewScreenHeight, setviewScreenHeight] = useState(0)
    const [isActive, setisActive] = useState(false)

    useEffect(() => {
        setcategorySel(isActive ? "search" : "all")
    }, [isActive])

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    useEffect(() => {
        setisLoading(true)
        const handleResize = () => {
            const screenHeight = window.screen.height;
            const windowHeight = window.innerHeight;
            setviewScreenHeight(windowHeight)
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Call the handler once on component mount
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (iniRender) {
            setiniRender(false)
            fetchData()
        }
    }, [isLoading])

    const fetchData = async () => {
        try {
            setloadingData("Fetching Cypher's Watchlist...")
            const response = await axios.get('https://raw.githubusercontent.com/AaryanShaikh/cypher-watchlist/main/data/rawData.json');
            setrawData(response.data)
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.log('Error fetching JSON data:', error);
        }
    };


    return (<>
        {
            isLoading ? <Loader /> : ""
        }
        {
            isLoading ? <div style={{ position: "absolute", height: "100vh", width: "100%", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <Text strong>{loadingData}</Text>
            </div> : ""
        }
        <Modal title="Watch Statistics" open={showStats} onCancel={() => setshowStats(false)} footer={[]}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", justifyContent: range ? "space-between" : "normal" }}>
                <Statistic title="Total [All] Watched" value={rawData.length} />
                <Statistic title="Total [All Eps] Watched" value={rawData.filter(x => x.category != "movies").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Anime Watched" value={rawData.filter(x => x.category == "anime").length} />
                <Statistic title="Total [Anime Eps] Watched" value={rawData.filter(x => x.category == "anime").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Series Watched" value={rawData.filter(x => x.category == "series").length} />
                <Statistic title="Total [Series Eps] Watched" value={rawData.filter(x => x.category == "series").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Movies Watched" value={rawData.filter(x => x.category == "movies").length} />
                <Statistic title="Total Currently Watching" value={rawData.filter(x => x.status == "in progress").length} />
            </div>
        </Modal>
        {isLoading ? "" : <FloatButton icon={<BiScatterChart />} onClick={() => setshowStats(true)} />}
        <div ref={widthRef} style={{ position: "absolute", width: "100%", height: "100vh", background: "transparent", backdropFilter: `blur(${isLoading ? "10" : "0"}px)`, zIndex: "100", transition: ".5s ease-in-out", pointerEvents: "none" }}></div>
        <div className='heading' style={{ background: !isDark ? "#1b1b1b" : "white" }}>
            <Text style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }} className='logo'>{range ? "CW" : "Cypher's WatchList"}</Text>
            <SearchBox dark={!isDark} searchText={searchText} setsearchText={setsearchText} isActive={isActive} setisActive={setisActive} />
            <Switch checked={isDark} onChange={(e) => setisDark(e)} checkedChildren={<BsFillSunFill />} unCheckedChildren={<BsMoonStars />} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "row" : "column", gap: "5px", background: !isDark ? "#1b1b1b" : "white" }}>
            <Tabs defaultActiveKey='all' activeKey={categorySel} tabPosition={range ? "top" : "left"} style={{ padding: "10px" }} onChange={(e) => setcategorySel(e)}>
                {
                    isActive ? <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "search" ? <MdScreenSearchDesktop style={{ color: "#1677ff", fontSize: "20px" }} /> : "Search"}</Text>} key="search" style={{ color: range ? "aliceblue" : "black" }}>
                        <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                            <List
                                grid={{ gutter: 16, column: range ? 2 : 6 }}
                                header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase())).length}</span> records</Text>}
                                dataSource={rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()))}
                                pagination={{ pageSize: 12 }}
                                renderItem={(ele, ind) => (
                                    <List.Item>
                                        <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane> : <>
                        <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "all" ? <GiPopcorn style={{ color: "#1677ff", fontSize: "20px" }} /> : "All"}</Text>} key='all'>
                            <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                <List
                                    grid={{ gutter: 16, column: range ? 2 : 6 }}
                                    header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.length}</span> records</Text>}
                                    dataSource={rawData}
                                    pagination={{ pageSize: 12 }}
                                    renderItem={(ele, ind) => (
                                        <List.Item>
                                            <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "ongoing" ? <GiTv style={{ color: "#1677ff", fontSize: "20px" }} /> : "Ongoing"}</Text>} key='ongoing'>
                            <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                <List
                                    grid={{ gutter: 16, column: range ? 2 : 6 }}
                                    header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(x => x.status == "in progress").length}</span> records</Text>}
                                    dataSource={rawData.filter(x => x.status == "in progress")}
                                    pagination={{ pageSize: 12 }}
                                    renderItem={(ele, ind) => (
                                        <List.Item>
                                            <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "anime" ? <GiAbstract060 style={{ color: "#1677ff", fontSize: "20px" }} /> : "Anime"}</Text>} key='anime'>
                            <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                <List
                                    grid={{ gutter: 16, column: range ? 2 : 6 }}
                                    header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(x => x.category == "anime").length}</span> records</Text>}
                                    dataSource={rawData.filter(x => x.category == "anime")}
                                    pagination={{ pageSize: 12 }}
                                    renderItem={(ele, ind) => (
                                        <List.Item>
                                            <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "series" ? <BiMoviePlay style={{ color: "#1677ff", fontSize: "20px" }} /> : "Series"}</Text>} key='series'>
                            <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                <List
                                    grid={{ gutter: 16, column: range ? 2 : 6 }}
                                    header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(x => x.category == "series").length}</span> records</Text>}
                                    dataSource={rawData.filter(x => x.category == "series")}
                                    pagination={{ pageSize: 12 }}
                                    renderItem={(ele, ind) => (
                                        <List.Item>
                                            <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab={<Text style={{ color: isDark ? "black" : "aliceblue" }}>{categorySel == "movies" ? <BiCameraMovie style={{ color: "#1677ff", fontSize: "20px" }} /> : "Movies"}</Text>} key='movies'>
                            <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 166 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                <List
                                    grid={{ gutter: 16, column: range ? 2 : 6 }}
                                    header={<Text>Showing <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(x => x.category == "movies").length}</span> records</Text>}
                                    dataSource={rawData.filter(x => x.category == "movies")}
                                    pagination={{ pageSize: 12 }}
                                    renderItem={(ele, ind) => (
                                        <List.Item>
                                            <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                    </>
                }
            </Tabs>
        </div>
    </>
    )
}

export default Homepage