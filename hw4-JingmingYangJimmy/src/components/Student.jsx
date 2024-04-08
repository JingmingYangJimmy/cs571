const Student = (props) => {

    return (<div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>Major: {props.major}</p>
        <p>Credits: {props.credit}</p>
        <p>{props.isFromWI ? "From Wisconsin" : "Not from Wisconsin"}</p>
        <p>Interests:</p>
        <ul>
                {props.interests && props.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                ))}
            </ul>
    </div>
    );
}

export default Student;