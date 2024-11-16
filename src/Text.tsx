import './index.css'
import logo from './assets/csgo-maps.jpg'

function Text({ prediction }: { prediction: string | null }) {
    return (
        <div className="p-6 max-w-5xl bg-neutral-900 text-white rounded-xl drop-shadow-2xl flex-row justify-center items-center">
            <h1 className="mb-5">Counter-Strike Round Prediction</h1>
            <img src={logo} alt="Logo" className="m-4" />
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
                This project aims to predict the outcome of a Counter-Strike: Global Offensive (CS) round by leveraging machine learning, specifically a random forest algorithm. The prediction model uses a variety of game features, displayed in an intuitive "Game Status Form," to capture key information that can influence the round’s result. These features include:
            </p>
            <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Time Left:</span>
                    <span className="text-gray-400">The remaining time in the round, which can affect player strategies.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Scores:</span>
                    <span className="text-gray-400">The current score for both Terrorist (T) and Counter-Terrorist (CT) teams, providing context on the overall game situation.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Map:</span>
                    <span className="text-gray-400">The specific map being played, as different maps favor certain strategies and team roles.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Bomb Status:</span>
                    <span className="text-gray-400">Whether the bomb has been planted, a critical factor in CT and T strategies.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">CT Defuse Kits:</span>
                    <span className="text-gray-400">The number of defuse kits available to the CT team, which can impact their chances if the bomb is planted.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Health and Armour:</span>
                    <span className="text-gray-400">The combined health and armor levels for both teams, representing their combat readiness.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Helmets:</span>
                    <span className="text-gray-400">The availability of helmets, as it can reduce headshot damage and influence survivability.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Players Alive:</span>
                    <span className="text-gray-400">The number of active players on each team, with more players alive generally providing an advantage.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Money:</span>
                    <span className="text-gray-400">Each team’s available funds, which determine their purchasing power for weapons and utilities.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300 font-medium">Weapons:</span>
                    <span className="text-gray-400">The specific weapons each team possesses, with different weapons providing distinct advantages in various scenarios.</span>
                </li>
            </ul>

            <p className="text-lg text-gray-200 mt-6">
                Using these inputs, the project’s random forest model analyzes historical game data to predict the likely winner of a given round. The random forest algorithm is particularly well-suited for this application due to its ability to handle both categorical and numerical data, making it effective in modeling the diverse set of variables in a CS round.
                <br />
                <br />
                By building this predictive model, the project aims to offer real-time insights into the potential outcome of a round based on the current game state. This tool could be valuable for players, analysts, and coaches looking to understand the factors that contribute to winning rounds and improve decision-making during the game.
            </p>
            {prediction && (
                <div className="mt-6 p-10 bg-neutral-800 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
                    <p className="text-lg text-blue-400">The round winner is: {prediction}</p>
                </div>
            )}
        </div>
    )
}

export default Text