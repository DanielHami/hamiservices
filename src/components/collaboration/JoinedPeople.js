import { Avatar } from "flowbite-react"
import { Badge } from "flowbite-react"

const RenderJoinedPeople = ({users}) => {

    const statusClass = state => {
        if (state == 'online') { return "success" }
        if (state == 'offline') { return "failure" }
      }

    const renderUsers = (users) => {
    if (users.length > 0) {
      return users.map(jp =>
        <div key={jp.uid}>   
          <div className="flex items-center gap-2">
            <Avatar
              img={`${jp.avatar}`}
              rounded={true}
            />
            <p>{jp.fullname}</p>
            <Badge color={`${statusClass(jp.state)}`} className="w-fit ml-6 ">
              {jp.state}
            </Badge>
          </div>
        </div>
      )
    } else {
      return null
    }
   }
   return renderUsers(users)
  }

  export default RenderJoinedPeople