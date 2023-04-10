import { useEffect, useState } from "react"
import moment from "moment"

const Timer = ({seconds, timeOutCallback}) => {
  const [secondsLeft, setSecondLeft] = useState(seconds)

  useEffect(() => {
    if(!secondsLeft) {return timeOutCallback()}

    const intervalId = setInterval(() => {
        setSecondLeft(secondsLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  },[secondsLeft, timeOutCallback])

  return (
    <div>
        {secondsLeft && moment.utc(secondsLeft * 1000).format('HH:mm:ss')}
    </div>
  )
}

export default Timer