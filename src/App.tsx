import { useState } from 'react'
import './App.css'
import { Input } from "@/components/ui/input"

function App({ onPredictionChange }: { onPredictionChange: (prediction: string) => void }) {
  interface Grenades {
    hegrenade: number;
    flashbang: number;
    smokegrenade: number;
    molotov: number;
  }

  interface GrenadeSectionProps {
    team: 'ct' | 't';
    grenades: Grenades;
    onUpdate: (team: 'ct' | 't', type: keyof Grenades, value: number) => void;
  }

  const [time_left, set_time_left] = useState(175)
  const [ct_score, set_ct_score] = useState(0)
  const [t_score, set_t_score] = useState(0)
  const [map, set_map] = useState("de_dust2")
  const [bomb_planted, set_bomb_planted] = useState(false)
  const [ct_defuse_kits, set_ct_defuse_kits] = useState(0)
  const [ct_health, set_ct_health] = useState(500)
  const [t_health, set_t_health] = useState(500)
  const [ct_armor, set_ct_armor] = useState(0)
  const [t_armor, set_t_armor] = useState(0)
  const [ct_helmets, set_ct_helmets] = useState(0)
  const [t_helmets, set_t_helmets] = useState(0)
  const [ct_money, set_ct_money] = useState(800)
  const [t_money, set_t_money] = useState(800)
  const [ct_players_alive, set_ct_players_alive] = useState(5)
  const [t_players_alive, set_t_players_alive] = useState(5)

  const [ct_weapons, set_CtWeapons] = useState(Array(5).fill("ct_weapon_usps"))
  const [t_weapons, set_TWeapons] = useState(Array(5).fill("t_weapon_glock"))

  const ctWeaponOptions = [
    { value: "ct_weapon_ak47", label: "AK-47" },
    { value: "ct_weapon_aug", label: "AUG" },
    { value: "ct_weapon_awp", label: "AWP" },
    { value: "ct_weapon_cz75auto", label: "CZ75-Auto" },
    { value: "ct_weapon_famas", label: "FAMAS" },
    { value: "ct_weapon_galilar", label: "Galil AR" },
    { value: "ct_weapon_glock", label: "Glock-18" },
    { value: "ct_weapon_m4a1s", label: "M4A1-S" },
    { value: "ct_weapon_m4a4", label: "M4A4" },
    { value: "ct_weapon_mac10", label: "MAC-10" },
    { value: "ct_weapon_mag7", label: "MAG-7" },
    { value: "ct_weapon_mp5sd", label: "MP5-SD" },
    { value: "ct_weapon_mp9", label: "MP9" },
    { value: "ct_weapon_sg553", label: "SG 553" },
    { value: "ct_weapon_ssg08", label: "SSG 08" },
    { value: "ct_weapon_ump45", label: "UMP-45" },
    { value: "ct_weapon_xm1014", label: "XM1014" },
    { value: "ct_weapon_deagle", label: "Desert Eagle" },
    { value: "ct_weapon_fiveseven", label: "Five-SeveN" },
    { value: "ct_weapon_usps", label: "USP-S" },
    { value: "ct_weapon_p250", label: "P250" },
    { value: "ct_weapon_p2000", label: "P2000" }
  ]

  const tWeaponOptions = [
    { value: "t_weapon_ak47", label: "AK-47" },
    { value: "t_weapon_aug", label: "AUG" },
    { value: "t_weapon_awp", label: "AWP" },
    { value: "t_weapon_cz75auto", label: "CZ75-Auto" },
    { value: "t_weapon_famas", label: "FAMAS" },
    { value: "t_weapon_galilar", label: "Galil AR" },
    { value: "t_weapon_glock", label: "Glock-18" },
    { value: "t_weapon_m4a4", label: "M4A4" },
    { value: "t_weapon_mac10", label: "MAC-10" },
    { value: "t_weapon_sg553", label: "SG 553" },
    { value: "t_weapon_ssg08", label: "SSG 08" },
    { value: "t_weapon_ump45", label: "UMP-45" },
    { value: "t_weapon_deagle", label: "Desert Eagle" },
    { value: "t_weapon_fiveseven", label: "Five-SeveN" },
    { value: "t_weapon_usps", label: "USP-S" },
    { value: "t_weapon_p250", label: "P250" },
    { value: "t_weapon_tec9", label: "Tec-9" }
  ]

  const handleCtWeaponChange = (index: number, value: string) => {
    const newWeapons = [...ct_weapons]
    newWeapons[index] = value
    set_CtWeapons(newWeapons)
  }

  const handleTWeaponChange = (index: number, value: string) => {
    const newWeapons = [...t_weapons]
    newWeapons[index] = value
    set_TWeapons(newWeapons)
  }


  const [ct_grenades, set_ct_grenades] = useState({
    hegrenade: 0,
    flashbang: 0,
    smokegrenade: 0,
    molotov: 0
  })

  const [t_grenades, set_t_grenades] = useState({
    hegrenade: 0,
    flashbang: 0,
    smokegrenade: 0,
    molotov: 0
  })

  // Helper function to update grenade counts
  const updateGrenades = (team: 'ct' | 't', type: string, value: number) => {
    const grenades = team === 'ct' ? ct_grenades : t_grenades
    const setGrenades = team === 'ct' ? set_ct_grenades : set_t_grenades

    // Calculate total grenades excluding the current type being modified
    const totalOtherGrenades = Object.entries(grenades)
      .filter(([key]) => key !== type)
      .reduce((sum, [_, count]) => sum + count, 0)

    // Special handling for flashbangs (max 10) vs other grenades (max 5)
    const maxAllowed = type === 'flashbang' ? 10 : 5
    const maxPossible = Math.min(
      maxAllowed,
      type === 'flashbang' ?
        20 - totalOtherGrenades : // For flashbangs
        Math.min(5, 20 - totalOtherGrenades) // For other grenades
    )

    // Ensure the new value doesn't exceed limits
    const newValue = Math.max(0, Math.min(value, maxPossible))

    setGrenades({
      ...grenades,
      [type]: newValue
    })
  }

  const handleSubmit = async () => {
    const data = {
      time_left,
      ct_score,
      t_score,
      map,
      bomb_planted,
      ct_defuse_kits,
      ct_health,
      t_health,
      ct_armor,
      t_armor,
      ct_helmets,
      t_helmets,
      ct_money,
      t_money,
      ct_players_alive,
      t_players_alive,
      ct_weapons,
      t_weapons,
      // Add grenade data
      ct_grenades,
      t_grenades
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      onPredictionChange(result.prediction || 'Unknown')
      console.log('Response:', result)
      console.log(JSON.stringify(data))
    } catch (error) {
      console.log(JSON.stringify(data))
      console.error('Error submitting data:', error)
      onPredictionChange('Error occurred')
    }
  }

  // Create a reusable grenade selection component
  const GrenadeSection: React.FC<GrenadeSectionProps> = ({ team, grenades, onUpdate }) => (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">{team === 'ct' ? 'CT' : 'T'} Grenades</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center justify-between">
            HE Grenades: {grenades.hegrenade}
            <span className="text-sm text-gray-400">(max 5)</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={grenades.hegrenade}
            onChange={(e) => onUpdate(team, 'hegrenade', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="flex items-center justify-between">
            Flashbangs: {grenades.flashbang}
            <span className="text-sm text-gray-400">(max 10)</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={grenades.flashbang}
            onChange={(e) => onUpdate(team, 'flashbang', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="flex items-center justify-between">
            Smokes: {grenades.smokegrenade}
            <span className="text-sm text-gray-400">(max 5)</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={grenades.smokegrenade}
            onChange={(e) => onUpdate(team, 'smokegrenade', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="flex items-center justify-between">
            {team === 'ct' ? 'Incendiary' : 'Molotov'}: {grenades.molotov}
            <span className="text-sm text-gray-400">(max 5)</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={grenades.molotov}
            onChange={(e) => onUpdate(team, 'molotov', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="text-sm text-gray-400">
        Total grenades: {Object.values(grenades).reduce((a, b) => a + b, 0)}/20
      </div>
    </div>
  )


  return (
    <div className="p-6 bg-neutral-900 text-white rounded-xl drop-shadow-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">Game Status Form</h1>

      {/* General Information */}
      <div className="space-y-4">
        <div>
          <label>Time Left: {time_left}</label>
          <input
            type="range"
            min="0"
            max="175"
            value={time_left}
            onChange={(e) => set_time_left(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-around space-x-2">
          <div className="w-1/4">
            <label>CT Score: {ct_score}</label>
            <Input
              type="number"
              min="0"
              max="32"
              value={ct_score}
              onChange={(e) => set_ct_score(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="w-1/4">
            <label>T Score: {t_score}</label>
            <Input
              type="number"
              min="0"
              max="32"
              value={t_score}
              onChange={(e) => set_t_score(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label>Map:</label>
          <select
            value={map}
            onChange={(e) => set_map(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2"
          >
            <option value="de_dust2">de_dust2</option>
            <option value="de_inferno">de_inferno</option>
            <option value="de_mirage">de_mirage</option>
            <option value="de_nuke">de_nuke</option>
            <option value="de_overpass">de_overpass</option>
            <option value="de_train">de_train</option>
            <option value="de_vertigo">de_vertigo</option>
            <option value="de_cache">de_cache</option>
          </select>
        </div>

        <div>
          <label>
            Bomb Planted
            <input
              type="checkbox"
              checked={bomb_planted}
              onChange={(e) => set_bomb_planted(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>

        <div>
          <label>CT Defuse Kits: {ct_defuse_kits}</label>
          <input
            type="range"
            min="0"
            max="5"
            value={ct_defuse_kits}
            onChange={(e) => set_ct_defuse_kits(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Split Columns */}
      <div className="flex space-x-8 mt-8">
        {/* T's Variables */}
        <div className="space-y-4 flex-1">
          <h2 className="text-lg font-semibold">T Variables</h2>

          <div>
            <label>T Health: {t_health}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={t_health}
              onChange={(e) => set_t_health(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>T Armour: {t_armor}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={t_armor}
              onChange={(e) => set_t_armor(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>T Helmets: {t_helmets}</label>
            <input
              type="range"
              min="0"
              max="5"
              value={t_helmets}
              onChange={(e) => set_t_helmets(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>T Players Alive: {t_players_alive}</label>
            <input
              type="range"
              min="0"
              max="5"
              value={t_players_alive}
              onChange={(e) => set_t_players_alive(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>T Money: {t_money}</label>
            <Input
              type="number"
              min="0"
              max="80000"
              value={t_money}
              onChange={(e) => set_t_money(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* T Weapons */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">T Weapons</h2>
            {t_weapons.map((weapon, index) => (
              <div key={index} className="mb-2">
                <label>Weapon Slot {index + 1}:</label>
                <select
                  value={weapon}
                  onChange={(e) => handleTWeaponChange(index, e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2"
                >
                  {tWeaponOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <GrenadeSection
            team="t"
            grenades={t_grenades}
            onUpdate={updateGrenades}
          />
        </div>

        {/* CT's Variables */}
        <div className="space-y-4 flex-1">
          <h2 className="text-lg font-semibold">CT Variables</h2>

          <div>
            <label>CT Health: {ct_health}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={ct_health}
              onChange={(e) => set_ct_health(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>CT Armour: {ct_armor}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={ct_armor}
              onChange={(e) => set_ct_armor(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>CT Helmets: {ct_helmets}</label>
            <input
              type="range"
              min="0"
              max="5"
              value={ct_helmets}
              onChange={(e) => set_ct_helmets(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>CT Players Alive: {ct_players_alive}</label>
            <input
              type="range"
              min="0"
              max="5"
              value={ct_players_alive}
              onChange={(e) => set_ct_players_alive(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>CT Money: {ct_money}</label>
            <Input
              type="number"
              min="0"
              max="80000"
              value={ct_money}
              onChange={(e) => set_ct_money(Number(e.target.value))}
              className="w-full"
            />
          </div>
          {/* CT Weapons */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">CT Weapons</h2>
            {ct_weapons.map((weapon, index) => (
              <div key={index} className="mb-2">
                <label>Weapon Slot {index + 1}:</label>
                <select
                  value={weapon}
                  onChange={(e) => handleCtWeaponChange(index, e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2"
                >
                  {ctWeaponOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <GrenadeSection
            team="ct"
            grenades={ct_grenades}
            onUpdate={updateGrenades}
          />
        </div>
      </div>

      <button
        className="w-full mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div >
  )
}

export default App