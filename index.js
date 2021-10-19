import React, { Component, useState, useEffect, useRef, } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, I18nManager, FlatList, Animated, Easing,Dimensions } from 'react-native';
import { font, Cred, CText, Cplaceholder, font_light, Cblue1, C999, Ccomponent, CTextGray, font_bold, Charchol, Cwhite2, Cwhite, font_medium, Cblue1O5, Charchol_light, Cred2O10 } from './src/Static';
import Modal from 'react-native-modal';
import GlobalFunction from './src/GlobalFunction';
const GLOBAL = Dimensions.get('window');

import moment from 'jalali-moment';
let todayChange = true
let autoNext = true
function DateS(props) {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("day");
    const [modal, setModal] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [year, setYear] = useState(1399);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [dayText, setDayText] = useState(1);
    const [dateStartText, setDateStartText] = useState("");
    const [dateEndText, setDateEndText] = useState("");
    const [startToggle, setStartToggle] = useState(true);
    const [day_list, setDay_list] = useState([]);
    // const fadeAnim = useRef(new Animated.Value(0)).current;
    const AnimSymbol = new Animated.Value(GLOBAL.width / 1.4);
    const year_list = GlobalFunction.get_year()
    const month_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const refContainer = useRef(null);
    const onViewRef = React.useRef((e) => {
        if (e.viewableItems.length > 0) {
            console.warn("//" + todayChange)
            if (e.viewableItems[0].index === 0 && todayChange === true) setStatus("day")
            if (e.viewableItems[0].index === 1) setStatus("month")
            if (e.viewableItems[0].index === 2) setStatus("year")
            setTimeout(() => todayChange = true, 500);
        }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: GLOBAL.width })

    useEffect(() => {
        // props.value ? setYear(props.value.split("/")[0]) : null
        // props.value ? setMonth(props.value.split("/")[1]) : null
        // props.value ? setDay(props.value.split("/")[2]) : null
        getToday()
    }, []);
    useEffect(() => {if(props.open)setModal(true) }, [props])
    useEffect(() => { checkValidateRange("day") }, [day])
    useEffect(() => { checkValidateRange("month") }, [month])
    useEffect(() => { checkValidateRange("year") }, [year])
    useEffect(() => { setStartToggle(true) }, [modal])
    useEffect(() => {
        if (!startToggle) { dateEndText ? generateDay("0", dateEndText.split("/")[0], dateEndText.split("/")[1], dateEndText.split("/")[2]) : null; dateEndText ? setDay(dateEndText.split("/")[2],) : null }
        else { dateStartText ? generateDay("0", dateStartText.split("/")[0], dateStartText.split("/")[1], dateStartText.split("/")[2]) : null; dateStartText ? setDay(dateStartText.split("/")[2]) : null }
    }, [startToggle])
    function checkValidateRange(type) {
        if (props.range) {
            if (startToggle) {
                let e = new Date(`${dateEndText.split("/")[0]}/${dateEndText.split("/")[1]}/${dateEndText.split("/")[2]}`);
                let s = new Date(`${year}/${month}/${day}`);
                if (s.getTime() > e.getTime()) {
                    setErrorText("تاریخ پایان نمی تواند از تاریخ شروع کوچکتر باشد !"); setError(true); setTimeout(() => {
                        setError(false)
                        if (dateStartText != "") { autoNext = false; generateDay("0", dateStartText.split("/")[0], dateStartText.split("/")[1], dateStartText.split("/")[2]); setDay(dateStartText.split("/")[2]) }
                    }, 2000);
                }
                else {
                    setDateStartText(`${year}/${month}/${day}`)
                    if (dateEndText == "") setTimeout(() => setDateEndText(`${year}/${month}/${day}`), 1000);
                    if (autoNext) {
                        refContainer.current ? refContainer.current.scrollToIndex({ animated: false, index: type == "day" ? 1 : type == "month" ? 2 : 0 }) : null;
                        
                    }
                    if (!autoNext) autoNext = true
                }
            }
            if (!startToggle) {
                // console.warn("*8*"+autoNext)
                let s = new Date(`${dateStartText.split("/")[0]}/${dateStartText.split("/")[1]}/${dateStartText.split("/")[2]}`);
                let e = new Date(`${year}/${month}/${day}`);
                if (s.getTime() > e.getTime()) {
                    setErrorText("تاریخ پایان نمی تواند از تاریخ شروع کوچکتر باشد !"); setError(true); setTimeout(() => {
                        if (dateEndText != "") { autoNext = false; generateDay("0", dateEndText.split("/")[0], dateEndText.split("/")[1], dateEndText.split("/")[2]); setDay(dateEndText.split("/")[2]) }
                        setError(false);
                    }, 2000);
                }
                else {
                    setDateEndText(`${year}/${month}/${day}`)
                    if (autoNext) { refContainer.current ? refContainer.current.scrollToIndex({ animated: false, index: type == "day" ? 1 : type == "month" ? 2 : 0 }) : null }
                    if (!autoNext) autoNext = true
                }
            }
        } else refContainer.current ? refContainer.current.scrollToIndex({ animated: false, index: type == "day" ? 1 : type == "month" ? 2 : 0 }) : null
    }
    function getToday() {
        let date = new Date();
        let m = moment(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, 'YYYY/M/D').format('jYYYY/jM/jD');
        setDay(m.split("/")[2])
        generateDay("0", m.split("/")[0], m.split("/")[1], m.split("/")[2])
    }
    function generateDay(type, y, m, d) {
        setYear(parseInt(y))
        setMonth(parseInt(m))
        if (type === "M" && m > 6 && parseInt(day) === 31) setDay(30)
        if (type === "Y" && parseInt(day) === 30 && !moment.jIsLeapYear(parseInt(y))) setDay(29)
        let D_L = []
        let d_m = moment(`${parseInt(y)}/${parseInt(m)}/${1}`, 'jYYYY/jM/jD').format('YYYY/M/D');
        let date = new Date(d_m.split("/")[0], d_m.split("/")[1] - 1, d_m.split("/")[2]);
        if (type === "0") setDayText(GlobalFunction.getNameWeekday((parseInt(date.getDay() + parseInt(d)) % 7) + 1))
        if (type === "M" || type === "Y") setDayText(GlobalFunction.getNameWeekday((parseInt(date.getDay() + parseInt(day)) % 7) + 1))
        for (let i = 1; i <= moment.jDaysInMonth(parseInt(y), parseInt(m) - 1); i++)D_L.push(i)
        if (date.getDay() < 6) for (let i = 1; i <= date.getDay() + 1; i++)D_L.unshift(0)
        setDay_list(D_L)
    }
    function submitDate() {
        if (props.range) {
            if (dateEndText == "") { setErrorText("تاریخ پایان را ثبت کنید !"); setError(true); setTimeout(() => setError(false), 2500); }
            else {
                props.onChange({
                    day: dateStartText.split("/")[2], month: dateStartText.split("/")[1], year: dateStartText.split("/")[0],
                    dayEnd: dateEndText.split("/")[2], monthEnd: dateEndText.split("/")[1], yearEnd: dateEndText.split("/")[0]
                })
                // console.warn(dateStartText + "الی" + dateEndText)
                setValue(dateStartText + " الی " + dateEndText)
                setModal(false)
                props.onClose()
            }
        }
        else {
            props.onChange({ day: parseInt(day) < 10 ? "0" + day : day, month: parseInt(month) < 10 ? "0" + month : month, year: year })
            setValue(year + "/" + parseInt(month) < 10 ? "0" + month : month + "/" + parseInt(day) < 10 ? "0" + day : day)
            setModal(false)
            props.onClose()
        }
    }
    function header() {
        return (
            <View style={{ flexDirection: "row", width: "100%", marginTop: 20, transform: [{ scaleX: -1 }] }}>
                <Text style={styles.textWeekDay} >جمعه</Text>
                <Text style={styles.textWeekDay}>پنج شنبه</Text>
                <Text style={styles.textWeekDay}>چهارشنبه</Text>
                <Text style={styles.textWeekDay}>سه شنبه</Text>
                <Text style={styles.textWeekDay}>دوشنبه</Text>
                <Text style={styles.textWeekDay}>یکشنبه</Text>
                <Text style={styles.textWeekDay}>شنبه</Text>
            </View>
        )
    }
    return (
        <View style={[styles.viewC1, props.style]}>
            <Modal
                onBackdropPress={() => {setModal(false);props.onClose();}}
                // avoidKeyboard={false}
                backdropOpacity={.7}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                animationInTiming={400}
                animationOutTiming={400}
                backdropTransitionInTiming={400}
                backdropTransitionOutTiming={400}
                isVisible={modal}>
                <View style={{ backgroundColor: Cwhite2, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                    {props.range && <View style={[styles.rowC4]}>
                        <TouchableOpacity onPress={() => {
                            Animated.timing(AnimSymbol, { toValue: GLOBAL.width / 4.2, duration: 200, easing: Easing.linear })
                                .start(() => { setStartToggle(false); })
                        }}
                            style={{ alignItems: "center", }}>
                            <Text style={[styles.rangeText, { color: !startToggle ? Cblue1 : Cplaceholder }]}>تاریخ پایان</Text>
                            <Text style={[styles.rangeText2, { color: !startToggle ? Charchol_light : Cplaceholder }]}>{dateEndText}</Text>
                        </TouchableOpacity>
                        <Image source={require('./src/arrow.png')} color={Cplaceholder} name='back' style={{width:25,height:25 }}  />
                        <TouchableOpacity onPress={() => { Animated.timing(AnimSymbol, { toValue: GLOBAL.width / 1.4, duration: 200, easing: Easing.linear }).start(() => setStartToggle(true)) }} style={{ alignItems: "center" }}>
                            <Text style={[styles.rangeText, { color: startToggle ? Cblue1 : Cplaceholder }]}>تاریخ شروع</Text>
                            <Text style={[styles.rangeText2, { color: startToggle ? Charchol_light : Cplaceholder }]}>{dateStartText}</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    <View style={{ width: "100%", justifyContent: "space-around", flexDirection: "row", marginTop: 10 ,marginBottom:13}}>
                        {props.range && <Animated.View style={[styles.symbolView, { left: AnimSymbol }]} />}
                        <TouchableOpacity onPress={() => { setStatus("year"); refContainer.current ? refContainer.current.scrollToIndex({ animated: true, index: 2 }) : null }} style={{ alignItems: "center" }}>
                            <Text style={[styles.textSelected, { color: status == "year" ? Cblue1 : Charchol }]}>{year}</Text>
                            <View style={[styles.viewBadge, { backgroundColor: status == "year" ? Cwhite2 : "transparent" }]}><View style={[status == "year" ? styles.badgeSelected : styles.badge]} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setStatus("month"); refContainer.current ? refContainer.current.scrollToIndex({ animated: true, index: 1 }) : null }} style={{ alignItems: "center" }}>
                            <Text style={[styles.textSelected, { color: status == "month" ? Cblue1 : Charchol }]}>{GlobalFunction.getmon(month)}</Text>
                            <View style={[styles.viewBadge, { backgroundColor: status == "month" ? Cwhite2 : "transparent" }]}><View style={[status == "month" ? styles.badgeSelected : styles.badge]} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setStatus("day"); refContainer.current ? refContainer.current.scrollToIndex({ animated: true, index: 0 }) : null }} style={{ alignItems: "center" }}>
                            <Text style={[styles.textSelected, { color: status == "day" ? Cblue1 : Charchol }]}>{day}</Text>
                            <Text style={[styles.textSelected2, { color: status == "day" ? Cblue1 : Charchol }]}>{dayText}</Text>
                            <View style={[styles.viewBadge, { backgroundColor: status == "day" ? Cwhite2 : "transparent" }]}><View style={[status == "day" ? styles.badgeSelected : styles.badge]} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            todayChange = false;
                            // setTimeout(() => {
                            setStatus("today"); getToday();
                            refContainer.current ? refContainer.current.scrollToIndex({ animated: false, index: 0 }) : null;
                            // }, 200);
                        }} style={{ alignItems: "center" }}>
                            <View style={[styles.viewToday, { backgroundColor: status === "today" ? Cblue1 : C999 }]}>
                                <Text style={[styles.textToday, { color: status === "today" ? Cwhite : Charchol, }]} >برو به </Text>
                                <Text style={[styles.textToday, { color: status === "today" ? Cwhite : Charchol, }]}>امـروز</Text>
                            </View>
                            <View style={[styles.viewBadge, { backgroundColor: status === "today" ? Cwhite2 : "transparent" }]}><View style={[status == "today" ? styles.badgeSelected : styles.badge]} /></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.line2} />
                    <TouchableOpacity onPress={() => submitDate()} style={[styles.submitBottom, { backgroundColor: !error ? Cblue1 : Cred }]}>
                        <Text style={[styles.textSubmit]}>{error ? errorText : "تایید"}</Text>
                    </TouchableOpacity>
                    <View style={{ minHeight: 400 }} >
                        <View style={styles.rowFlat}>
                            <FlatList data={[1, 1, 1]}
                                horizontal
                                style={{ height: "100%" }}
                                initialScrollIndex={0}
                                snapToAlignment={'center'}
                                ref={refContainer}
                                snapToInterval={GLOBAL.width}
                                onViewableItemsChanged={onViewRef.current}
                                viewabilityConfig={viewConfigRef.current}
                                // onScrollEndDrag={(e)=>console.warn(e.viewabilityConfig)}
                                // getItemLayout={(data, index) => ({ length: GLOBAL.width, offset: GLOBAL.width * index, index })}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    if (index === 2)
                                        return (
                                            <FlatList data={year_list}
                                                keyExtractor={(item, index) => index}
                                                numColumns={5}
                                                style={{ width: GLOBAL.width }}
                                                // initialScrollIndex={20}
                                                renderItem={({ item, index }) =>
                                                    <TouchableOpacity
                                                        onPress={() => generateDay("Y", item, month)}
                                                        style={[styles.view_yare, { backgroundColor: item == year ? (error ? Cred2O10 : C999) : "transparent", }]}>
                                                        <Text style={[styles.textYear, { color: item == year ? (error ? Cred : Cblue1) : Charchol }]}>{item}</Text>
                                                    </TouchableOpacity>
                                                }
                                            />
                                        )
                                    else if (index === 1) return (
                                        <FlatList data={month_list}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={3}
                                            style={{ width: GLOBAL.width }}
                                            renderItem={({ item, index }) =>
                                                <TouchableOpacity
                                                    onPress={() => { generateDay("M", year, item,) }}
                                                    style={[styles.view_month, { backgroundColor: item == month ? (error ? Cred2O10 : C999) : "transparent", }]}>
                                                    <Text style={[styles.textMonth, { color: item == month ? (error ? Cred : Cblue1) : Charchol }]}>{GlobalFunction.getmon(item)}</Text>
                                                    <Text style={[styles.textMonth2,]}>{item}</Text>
                                                </TouchableOpacity>
                                            }
                                        />
                                    )
                                    else
                                        return (
                                            <FlatList data={day_list}
                                                keyExtractor={(item, index) => index.toString()}
                                                numColumns={7}
                                                ListHeaderComponent={header}
                                                style={{ width: GLOBAL.width, direction: "rtl" }}
                                                renderItem={({ item, index }) =>
                                                    <TouchableOpacity
                                                        onPress={() => { setDay(item); setDayText(GlobalFunction.getNameWeekday((index % 7) + 1)); }}
                                                        style={[styles.view_day, { backgroundColor: item == day ? (error ? Cred2O10 : C999) : "transparent", }]}>
                                                        <Text style={[styles.textDay, { color: item == day ? (error ? Cred : Cblue1) : Charchol }]}>{item === 0 ? "" : item}</Text>
                                                    </TouchableOpacity>
                                                }
                                            />
                                        )
                                }
                                }
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default DateS;
const styles = StyleSheet.create({
    viewC1: { justifyContent: 'center', alignItems: 'center' },
    textC1: { width: '100%', alignSelf: "flex-start", textAlign: 'right', paddingRight: 20, fontFamily: font, color: CText, fontSize: 14, marginBottom: 5 },
    inputC1: { flex: 1, textAlign: 'right', fontFamily: font, marginRight: 20, fontSize: 14, padding: 0, backgroundColor: "transparent" },
    view2C1: { flexDirection: 'row', backgroundColor: Ccomponent, height: GLOBAL.height / 15, maxHeight: 50, alignItems: "center" },
    view3C1: { width: 50, height: GLOBAL.height / 15, maxHeight: 50, justifyContent: 'center', alignItems: 'center', },
    rowC4: {
        flexDirection: 'row', justifyContent: "space-around", width: '100%', alignSelf: 'center', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: Cwhite,
        backgroundColor: C999, borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingHorizontal: "10%", alignItems: "center"
    },
    rowFlat: {
        flexDirection: "row", height: 400,
        alignItems: "center", justifyContent: "center", flex: 1, borderRadius: 10, transform: [{ scaleX: -1 }], marginTop: 12
    },
    view_yare: { flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 3, transform: [{ scaleX: -1 }], borderRadius: 10 },
    view_month: { flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 3, transform: [{ scaleX: -1 }], borderRadius: 10, flexDirection: "row", paddingRight: "7%", paddingVertical: 3 },
    view_day: { width: "14%", alignItems: "center", justifyContent: "center", marginBottom: 3, transform: [{ scaleX: -1 }], borderRadius: 10, height: 45 },
    textYear: { fontFamily: font_medium, color: Charchol, fontSize: 14, marginVertical: 12 },
    textMonth: { fontFamily: font_medium, color: Charchol, fontSize: 14, marginVertical: 12 },
    textDay: { fontFamily: font_medium, color: Charchol, fontSize: 14, marginVertical: 5 },
    rangeText: { fontFamily: font_bold, fontSize: 10, },
    rangeText2: { fontFamily: font_bold, fontSize: 16, },
    textMonth2: { fontFamily: font_light, color: Cplaceholder, marginLeft: 10, fontSize: 14, marginVertical: 12 },
    textToday: { fontFamily: font_medium, fontSize: 12, },
    textWeekDay: { fontFamily: font_bold, color: Cblue1, fontSize: 10, opacity: .5, flex: 1, textAlign: "center" },
    textSelected: { fontFamily: font_bold, color: Charchol, fontSize: 18, },
    textSelected2: { fontFamily: font_light, color: Charchol, fontSize: 10, marginBottom: 10 },
    textSubmit: { fontFamily: font_medium, color: Cwhite, fontSize: 16, marginVertical: 13, },
    submitBottom: {
        backgroundColor: Cblue1, borderRadius: 10, justifyContent: "center", alignItems: "center", width: "90%", alignSelf: "center"
        , position: "absolute", zIndex: 10, bottom: 20, height: 50
    },
    line: { width: "100%", height: 2, backgroundColor: C999, zIndex: -1 },
    line2: { width: "100%", height: 2, backgroundColor: Cwhite, zIndex: -1 },
    badge: {
        width: 8, height: 8, borderRadius: 4, shadowOffset: { width: 0, height: 2 }, backgroundColor: C999,
        shadowOpacity: 1, shadowColor: Cwhite
    },
    badgeSelected: { width: 8, height: 8, borderRadius: 4, backgroundColor: Cblue1, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0 },
    viewBadge: { width: 10, height: 10, borderRadius: 50, bottom: -20, zIndex: 20, position: "absolute" },
    viewToday: { alignItems: "center", justifyContent: "center", borderRadius: 10, alignSelf: "center", width: 50, height: 50, },
    symbolView: { width: 20, height: 20, transform: [{ rotate: '45deg' }], backgroundColor: Cwhite2, position: "absolute", top: -20, borderTopLeftRadius: 3 }
});




