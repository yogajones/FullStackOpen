const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.data.name.common} </h3>
            <div>capital {country.data.capital} </div>
            <div>population {country.data.population}</div>
            <img src={country.data.flags.svg} height='100' alt={country.data.flags.alt} />
        </div>
    )
}

export default Country