import axios from "axios"
import { useEffect, useState } from "react"
import { Movie, SearchProps, CompanyType } from "../../extras/types"
import defaultLogo from '../../img/icons/videocam-outline.svg'
import s from './Company.module.css'
import loadingGif from '../../img/loadingGif.gif';
import Card from "../Card/Card"
import { showMessage } from "../../extras/functions"
import { countries } from "../../extras/globalVariables"

export default function Company({ id }: SearchProps) {

    const [company, setCompany] = useState<CompanyType>({
        description: "", headquarters: "", homepage: "",
        id: 0, logo_path: "", name: "", origin_country: ""
    })
    const [companyMovies, setCompanyMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCompany() {
            try {
                setLoading(true)
                const company = await axios.get(`https://api.themoviedb.org/3/company/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
                const companyMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_companies=${id}`)
                setCompanyMovies(companyMovies.data.results)
                setCompany(company.data)
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCompany();
        return () => { source.cancel("Unmounted"); }
    }, [id])

    return (
        <>
            {!loading ?
                <div className='flexCentered'>
                    <div className={s.companyInfo}>
                        <div className={s.left}>
                            <img className={s.logo} src={company.logo_path ? `https://image.tmdb.org/t/p/w500${company.logo_path}` : defaultLogo} alt={company.name}></img>
                        </div>
                        <div className={s.right}>
                            <div>
                                <h1 className='w-100'>{company.name}</h1>
                                {company.description ? <><span className='w-100 bold'>Description</span><p className='w-100'>{company.description}</p></> : null}
                                {company.headquarters ? <><span className='w-100 bold'>Headquarters</span><p className='w-100'>{company.headquarters}</p></> : null}
                                {company.origin_country ? <><span className='w-100 bold'>Origin country</span><p className='w-100'>{countries.filter(e => e.code === company.origin_country)[0].name}</p></> : null}
                                {company.homepage ? <a className='btn btn-primary' href={company.homepage} target="_blank" rel="noreferrer">Visit website</a> : null}
                            </div>
                        </div>
                    </div>
                    <div className='cardsContainerMargin'>
                        <h2 className='w-100 mb-3 text-center'>Movies</h2>
                        {companyMovies.map((e, index) => <Card key={index} movie={e}></Card>)}
                    </div>
                </div>
                :
                <div className='contentCenter'>
                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    )
}