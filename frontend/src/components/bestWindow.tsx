import React, {useState} from "react"
import {api} from '../api/power.api'

interface BestWindowResult {
  start: string;
  end: string;
  averageCleanPerc: number;
}

const BestWindow: React.FC = () => {
    const [hours, setHours] = useState<number>(1)
    const [result, setResult] = useState<BestWindowResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchBestWindow = async () => {
        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await api.get(`/api/energy/best-window?hours=${hours}`)
            setResult(response.data)
        } catch (err: any){
            console.error(err)
            setError(err?.response?.data?.message || 'server error')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div style={{marginTop: '2rem'}}>
            <h2>Optymalny czas ładownaia:</h2>
                
            <label>Wybierz czas ładownaia, 1-6h:
            <input type="number" min={1} max={6} value={hours} onChange={(e) => setHours(parseInt(e.target.value))} style={{marginLeft: '0.5rem', widows: '50px'}}/>
            </label>

            <button onClick={fetchBestWindow} style={{marginLeft: '1rem'}}>Sprawdź</button>

            {loading && <p>Ładowanie...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {result && (
                <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                    <p><strong>Start:</strong> {new Date(result.start).toLocaleString()}</p>
                    <p><strong>Koniec:</strong> {new Date(result.end).toLocaleString()}</p>
                    <p><strong>Średni udział czystej energii:</strong> {result.averageCleanPerc}%</p></div>
            )}
        </div>
    )
}
export default BestWindow