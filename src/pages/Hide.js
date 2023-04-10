import withAuthorization from "components/hoc/withAuthorization"

const SecretPage = (props) => {
    return (
        <h1>Im a secret page for auth user</h1>
    )
}

export default withAuthorization(SecretPage)