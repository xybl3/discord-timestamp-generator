import { useEffect, useRef, useState } from 'react'

// Components
import Container from '../components/Container'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Text from '../components/Text'
import Timestamp from '../components/Timestamp'
import CodeBlock from '../components/CodeBlock'

// Date/moment stuff
import { dateToUnix, getMomentFormat } from '../util/date'
import Moment from 'react-moment'
import 'moment'
import 'moment/min/locales'

const TimestampContainer = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                marginTop: '5px',
            }}
        >
            {props.children}
        </div>
    )
}

export default function Home() {
    const yearRef = useRef(null)
    const monthRef = useRef(null)
    const dayRef = useRef(null)
    const hourRef = useRef(null)
    const minuteRef = useRef(null)
    const secondRef = useRef(null)
    const timestampRef = useRef(null)
    const [date, setDate] = useState(new Date())

    const momentLocale = navigator.languages[0].toLowerCase()

    function validate(value, type) {
        value = value.replace(/[^0-9]/g, '')
        if (isNaN(value)) return false
        if (type === 'year' && (value < 1000 || value > 3000)) return false
        if (type === 'month' && (value < 1 || value > 12)) return false
        if (type === 'day' && (value < 1 || value > 31)) return false
        if (type === 'hour' && (value < 0 || value > 23)) return false
        if ((type === 'minute' || type === 'second') && (value < 0 || value > 59)) return false
        return true
    }

    function handleDateChange(e) {
        const year = yearRef.current
        const month = monthRef.current
        const day = dayRef.current
        const hour = hourRef.current
        const minute = minuteRef.current
        const second = secondRef.current

        if (
            !validate(year.value, 'year') ||
            !validate(month.value, 'month') ||
            !validate(day.value, 'day') ||
            !validate(hour.value, 'hour') ||
            !validate(minute.value, 'minute') ||
            !validate(second.value, 'second')
        )
            return false

        const _date = new Date(
            year.value,
            month.value - 1,
            day.value,
            hour.value,
            minute.value,
            second.value
        )

        setDate(_date)
    }

    useEffect(() => {
        let _date = new Date()

        const year = yearRef.current
        const month = monthRef.current
        const day = dayRef.current
        const hour = hourRef.current
        const minute = minuteRef.current
        const second = secondRef.current

        function updateDate() {
            if (
                !validate(year.value, 'year') ||
                !validate(month.value, 'month') ||
                !validate(day.value, 'day') ||
                !validate(hour.value, 'hour') ||
                !validate(minute.value, 'minute') ||
                !validate(second.value, 'second')
            ) {
                _date = new Date()
                setDate(_date)
            }
        }

        updateDate()
        setInterval(updateDate, 100)
    }, [])

    return (
        <Container>
            <div>
                <Heading>Discord Timestamp Generator</Heading>
                <Text muted>
                    This is a simple tool to generate Discord timestamps. You can use it on messages
                    or in your profile bio!
                </Text>
            </div>
            <div style={{ margin: '25px 0' }}>
                <Text>Date:</Text>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <Input
                        type='number'
                        placeholder='Year'
                        max='9999'
                        step='1'
                        ref={yearRef}
                        onChange={handleDateChange}
                    />
                    <Input
                        type='number'
                        placeholder='Month'
                        min='01'
                        max='12'
                        step='1'
                        ref={monthRef}
                        onChange={handleDateChange}
                    />
                    <Input
                        type='number'
                        placeholder='Day'
                        min='01'
                        max='31'
                        step='1'
                        ref={dayRef}
                        onChange={handleDateChange}
                    />
                    <Input
                        type='number'
                        placeholder='Hour (24h)'
                        min='00'
                        max='23'
                        step='1'
                        ref={hourRef}
                        onChange={handleDateChange}
                    />
                    <Input
                        type='number'
                        placeholder='Minutes'
                        min='00'
                        max='59'
                        step='1'
                        ref={minuteRef}
                        onChange={handleDateChange}
                    />
                    <Input
                        type='number'
                        placeholder='Seconds'
                        min='00'
                        max='59'
                        step='1'
                        ref={secondRef}
                        onChange={handleDateChange}
                    />
                </div>
                <Text muted ref={timestampRef}>
                    UNIX timestamp: {Math.floor(date.getTime() / 1000)}
                </Text>
            </div>
            <div style={{ margin: '25px 0' }}>
                <Text>Generated Timestamps:</Text>
                <Text muted>
                    Click on the left code to copy, then paste it on your message or profile bio.
                </Text>
                <div>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment locale={momentLocale} date={date} format={getMomentFormat()} />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:D>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('D')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:d>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('d')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:F>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('F')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:f>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('f')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:R>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment locale={momentLocale} date={date} fromNow />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:T>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('T')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:t>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('t')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                </div>
            </div>
        </Container>
    )
}
