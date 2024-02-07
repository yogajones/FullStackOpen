const DeletePersonButton = ({ person, deletePerson }) => {
    return (
        <button type="submit" onClick={() => { deletePerson(person) }}>
            delete
        </button>
    )
}

const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name} {person.number} <DeletePersonButton person={person} deletePerson={deletePerson} />
        </li>
    )
}

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person => (
                <Person key={person.id} person={person} deletePerson={deletePerson} />
            )
            )}
        </ul>)
}

export default Persons