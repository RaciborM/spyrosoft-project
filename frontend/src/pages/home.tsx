import React from 'react'
import PowerMixChart from '../components/powerMixChart'
import BestWindow from '../components/bestWindow'

const Home: React.FC = () => {
    return (
        <div>
            <h1>UK Power mix:</h1>
            <PowerMixChart />
            <BestWindow />
        </div>
    )
}
export default Home