import withAuthorization from "components/hoc/withAuthorization"

function SecretPage(props) {
    return (
        <h1>Im a secret page for auth user</h1>
    )
}

export default withAuthorization(SecretPage)