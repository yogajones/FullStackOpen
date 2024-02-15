const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km<sup>2</sup> </p>
            <br></br>
            <b>Languages:</b>
            <ul>
                {Object.keys(country.languages).map(key => (
                    <li key={key}>{country.languages[key]}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} border="1" />
        </div>
    )
}

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, please specify your filter.</p>
    } else if (countries.length === 1) {
        return <Country country={countries[0]} />
    } else {
        return (
            <div>
                <ul>
                    {countries.map(country => (
                        <li key={country.name.common}>{country.name.common}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Countries