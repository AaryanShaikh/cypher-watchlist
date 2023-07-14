import React, { useState, useEffect, useRef, lazy } from 'react'
import { Input, Switch, Typography, FloatButton, Modal, Statistic, Tabs, List, Tour, message } from 'antd'
import { Gi3DGlasses, GiAbstract060, GiCrossMark, GiGamepad, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay, BiScatterChart } from 'react-icons/bi'
import { BsMoonStars, BsFillSunFill } from 'react-icons/bs';
import { MdScreenSearchDesktop } from 'react-icons/md'
import CardItem from '../../components/Card';
import Loader from '../../components/Loader';
import axios from 'axios';
import SearchBox from '../../components/SearchBox';
import Head from 'next/head';
import NumberCounter from '../../components/NumberCounter';
import Profile from '../../components/Profile';
import CircularProgress from '../../components/CircularProgress';

const { Text } = Typography
const { Search } = Input
const { TabPane } = Tabs

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const [isDark, setisDark] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [showStats, setshowStats] = useState(false)
    const [showStatsData, setshowStatsData] = useState(false)
    const [searchText, setsearchText] = useState("")
    const [rawData, setrawData] = useState([])
    const [iniRender, setiniRender] = useState(true)
    const [viewScreenHeight, setviewScreenHeight] = useState(0)
    const [isActive, setisActive] = useState(false)
    const [allCats, setallCats] = useState(["all", "ongoing"])
    const [showTour, setshowTour] = useState(false)
    const [showProfile, setshowProfile] = useState(false)
    const [loadStep, setloadStep] = useState(1)
    const [ProgLoad, setProgLoad] = useState(0)
    const step1 = useRef(null)
    const step2 = useRef(null)
    const step3 = useRef(null)
    const step4 = useRef(null)
    const step5 = useRef(null)
    const steps = [
        {
            title: 'Welcome to my Virtual Sanctuary!',
            description: "Within these digital walls, you'll find a collection of cherished memories, encompassing the vast universe of Anime, Series, Movies, and Games I've personally explored. Allow me to give you a quick tour of the site and then I'll leave you to wander freely.",
            cover: (
                <img
                    alt="tour.png"
                    src="https://github.com/AaryanShaikh/My-Stock/raw/main/welcome-images-server.gif"
                    style={{ width: "50%" }}
                />
            ),
            mask: {
                style: {
                    backdropFilter: 'grayscale(1)',
                    transition: ".5s ease-in-out"
                },
            },
            target: () => step1.current,
        },
        {
            title: 'data.filter()',
            description: "Use this section to execute a very complex code which will filter out the data for you.",
            target: () => step2.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.8)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: '!google',
            description: "Traverse this vast realm of information effortlessly using this search!",
            target: () => step4.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.6)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: "Now u see me, now u don't!",
            description: "Transform the atmosphere at your command, be it Light or Dark!",
            target: () => step5.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.4)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: 'typeof number',
            description: "This will allow you to unravel the Melody of Statistics",
            target: () => step3.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.2)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: 'Who is Aaryan?',
            description: "This will allow you to access my profile & my other handles!",
            target: () => step1.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0)',
                    transition: ".5s ease-in-out"
                },
            },
        },
    ];

    useEffect(() => {
        if (showStats) {
            setshowStatsData(showStats)
        } else {
            setTimeout(() => {
                setshowStatsData(showStats)
            }, 1000)
        }
    }, [showStats])

    useEffect(() => {
        setcategorySel(isActive ? "search" : "all")
    }, [isActive])

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setloadStep(2)
            setProgLoad(42)
            setTimeout(() => {
                fetchData()
            }, 2000)
        }, 2000);
        const handleResize = () => {
            const screenHeight = window.screen.height;
            const windowHeight = window.innerHeight;
            setviewScreenHeight(windowHeight)
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/AaryanShaikh/cypher-watchlist/main/data/rawData.json');
            setrawData(response.data)
            const uniqueArray = Array.from(
                new Set(response.data.map((obj) => obj.category))
            );
            setallCats([...allCats, ...uniqueArray])
            setloadStep(3)
            setProgLoad(87)
            setTimeout(() => {
                setProgLoad(100)
                setTimeout(() => {
                    setloadStep(4)
                    setTimeout(() => {
                        setloadStep(5)
                        setTimeout(() => {
                            setloadStep(6)
                            setTimeout(() => {
                                setloadStep(7)
                                setTimeout(() => {
                                    setshowTour(true)
                                }, 900)
                            }, 1500)
                        }, 1000)
                    }, 100)
                }, 1700)
            }, 2000)
        } catch (error) {
            setloadStep(5)
            console.log('Error fetching JSON data:', error);
        }
    };

    const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (<>
        <Head>
            <link rel="shortcut icon" href="https://raw.githubusercontent.com/AaryanShaikh/cypher-watchlist/main/public/favicon.ico" />
            <title>{
                categorySel == "all" ? "Aaryan's Memoirs" :
                    categorySel == "search" ? "Search Aaryan's Memoirs" :
                        categorySel == "ongoing" ? "Aaryan's current watching" :
                            categorySel == "anime" ? "Aaryan's watched anime" :
                                categorySel == "series" ? "Aaryan's watched series" :
                                    categorySel == "movies" ? "Aaryan's watched movies" :
                                        "Aaryan's played games"
            }</title>
        </Head>
        {showProfile ? <Profile showProfile={showProfile} setshowProfile={setshowProfile} range={range} /> : ""}
        <div style={{ position: "absolute", height: "100vh", width: "100%", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", justifyContent: range ? "space-between" : "normal", position: "absolute", padding: "20px", width: range ? "80%" : "30%", borderRadius: "10px", transition: ".7s cubic-bezier(0.68, -0.55, 0.265, 1.55)", background: "transparent", gap: "10px", pointerEvents: "none", transform: `scale(${showStats ? "1" : "0"})`, opacity: showStats ? "1" : "0.2", zIndex: "10", backdropFilter: "blur(20px) grayscale(1) brightness(0.5)", boxShadow: "black 0px 0px 8px 0px", justifyItems: "center" }}>
                {
                    showStatsData ? <>
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

            </div>
        </div>
        <FloatButton
            style={{ transition: ".5s ease-in-out", opacity: loadStep == 7 ? "1" : "0" }}
            ref={step3}
            icon={<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <GiCrossMark style={{ transform: `scale(${showStats ? "1" : "0"})`, transition: ".5s ease-in-out", position: "absolute" }} />
                <BiScatterChart style={{ transform: `scale(${showStats ? "0" : "1"})`, transition: ".5s ease-in-out", position: "absolute" }} /></div>}
            onClick={() => setshowStats(!showStats)}
        />

        {/* loading stuff */}

        <div ref={widthRef} style={{ position: "absolute", width: "100%", height: "100vh", background: loadStep == 7 ? "transparent" : "#212121", zIndex: "100", transition: ".5s ease-in-out", pointerEvents: "none", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <CircularProgress show={loadStep <= 4} value={ProgLoad} />
            <Text className={`loadFont ${loadStep == 1 ? "loadIt" : ""}`} style={{ transition: ".5s ease-in-out", fontSize: "15px", color: "#e6e6e6", fontStyle: "'Ysabeau Infant', sans-serif", textDecoration: loadStep == 2 ? "line-through" : "none", opacity: loadStep == 2 ? "0.4" : loadStep >= 3 ? "0" : "1", }}>Loading DOM</Text>
            <Text className={`loadFont ${loadStep == 2 ? "loadIt" : ""}`} style={{ transition: ".5s ease-in-out", fontSize: "15px", color: "#e6e6e6", fontStyle: "'Ysabeau Infant', sans-serif", opacity: loadStep == 2 ? "1" : "0", textDecoration: loadStep == 3 ? "line-through" : "none" }}>Fetching records of Aaryan's Memoirs</Text>
        </div>

        {/* loading stuff end */}

        <div className='heading' style={{ background: !isDark ? "#212121" : "white", transition: ".5s ease-in-out", }}>
            {range ? <div onClick={() => { setshowProfile(true) }} ref={step1} style={{ display: "flex", flexDirection: "column", cursor: "pointer", zIndex: "101", position: "relative", top: loadStep == 7 ? "0%" : "43vh", left: loadStep == 7 ? "0%" : "43vw", opacity: loadStep == 6 || loadStep == 7 ? "1" : "0", transition: ".5s ease-in-out", transform: loadStep == 7 ? "scale(1)" : "scale(3)", pointerEvents: loadStep == 7 ? "all" : "none" }}><Text className='logo' style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }}>Aaryan's</Text><Text className='logo' style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }}>Memoirs</Text></div> :
                <Text onClick={() => { setshowProfile(true) }} ref={step1} style={{ color: !isDark ? "white" : "black", transition: ".5s ease-in-out", cursor: "pointer", zIndex: "101", position: "relative", top: loadStep == 7 ? "0%" : "43vh", left: loadStep == 7 ? "0%" : "43vw", opacity: loadStep == 6 || loadStep == 7 ? "1" : "0", transform: loadStep == 7 ? "scale(1)" : "scale(3)", pointerEvents: loadStep == 7 ? "all" : "none" }} className='logo'>Aaryan's Memoirs</Text>
            }
            <SearchBox refs={step4} dark={!isDark} searchText={searchText} setsearchText={setsearchText} isActive={isActive} setisActive={setisActive} />
            <Switch ref={step5} checked={isDark} onChange={(e) => setisDark(e)} checkedChildren={<BsFillSunFill />} unCheckedChildren={<BsMoonStars />} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "column" : "column", gap: "5px", background: !isDark ? "#212121" : "white", minHeight: "100vh", transition: ".5s ease-in-out" }}>
            <Tabs defaultActiveKey='all' activeKey={categorySel} tabPosition={range ? "top" : "left"} style={{ padding: "10px", overflow: range ? "scroll" : "hidden", }} onChange={(e) => setcategorySel(e)}>
                {
                    isActive ? <TabPane tab={
                        <div style={{ display: "flex", gap: "0px", alignItems: "center", flexDirection: "column", width: "50px", height: "60px" }}>
                            <MdScreenSearchDesktop style={{ opacity: "0.5", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                            <Text className="selICon textFont" style={{ color: isDark ? "black" : "aliceblue", fontSize: "14px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>Search</Text>
                            <MdScreenSearchDesktop style={{ opacity: "0.5", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                        </div>
                    } key="search" style={{ color: range ? "aliceblue" : "black" }}>
                        <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 197 : "86vh", padding: "10px 5px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>
                            <List
                                grid={{ gutter: 16, column: range ? 2 : 6 }}
                                header={<Text className='textFont' style={{ color: isDark ? "black" : "aliceblue", transition: ".5s ease-in" }}>Found <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase())).length}</span> records</Text>}
                                dataSource={rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()))}
                                pagination={{ pageSize: 12, showSizeChanger: false }}
                                renderItem={(ele, ind) => (
                                    <List.Item>
                                        <CardItem key={ind} dark={!isDark} range={range} show={loadStep == 7} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} isSearch={isActive} searchText={searchText} />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane> : <>
                        {
                            allCats.map((ele, ind) => {
                                return <TabPane key={ele} tab={
                                    <div ref={ind == 0 ? step2 : null} style={{ display: "flex", gap: "0px", alignItems: "center", flexDirection: "column", width: "50px" }}>
                                        {
                                            ele == "all" ? <>
                                                <Gi3DGlasses style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                <Gi3DGlasses style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                            </> :
                                                ele == "ongoing" ?
                                                    <>
                                                        <GiTv style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                        <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                        <GiTv style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                                    </> :
                                                    ele == "anime" ? <>
                                                        <GiAbstract060 style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                        <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                        <GiAbstract060 style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                                    </> :
                                                        ele == "series" ? <>
                                                            <BiMoviePlay style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                            <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                            <BiMoviePlay style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                                        </> :
                                                            ele == "movies" ? <>
                                                                <BiCameraMovie style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                                <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                                <BiCameraMovie style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                                            </> :
                                                                ele == "game" ? <>
                                                                    <GiGamepad style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", position: "relative", top: "10px" }} />
                                                                    <Text className='textFont' style={{ color: isDark ? categorySel == ele ? "#1677ff" : "black" : "aliceblue", fontSize: categorySel == ele ? "14px" : "0px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}>{capitalizeFirstLetter(ele)}</Text>
                                                                    <GiGamepad style={{ opacity: categorySel == ele ? "0.5" : "1", fontSize: "20px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", color: isDark ? "black" : "aliceblue", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", position: "relative", bottom: "10px" }} />
                                                                </> : ""
                                        }

                                    </div>
                                }>
                                    <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 197 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                        <List
                                            grid={{ gutter: 16, column: range ? 2 : 6 }}
                                            header={<Text className='textFont' style={{ color: isDark ? "black" : "aliceblue", transition: ".5s ease-in" }}>Total <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{
                                                ele == "all" ? rawData.length :
                                                    ele == "ongoing" ? rawData.filter(x => x.status == "in progress").length :
                                                        rawData.filter(x => x.category == ele).length
                                            }</span> records</Text>}
                                            dataSource={
                                                ele == "all" ? rawData :
                                                    ele == "ongoing" ? rawData.filter(x => x.status == "in progress") :
                                                        rawData.filter(x => x.category == ele)
                                            }
                                            pagination={{ pageSize: 12 }}
                                            renderItem={(ele, ind) => (
                                                <List.Item>
                                                    <CardItem key={ind} dark={!isDark} range={range} show={loadStep == 7} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </TabPane>
                            })
                        }
                    </>
                }
            </Tabs>
        </div>
        <Tour open={showTour} onClose={() => setshowTour(false)} steps={steps} />
    </>
    )
}

export default Homepage
