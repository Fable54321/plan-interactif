import { Outlet } from "react-router-dom"


function App() {


  return (
    <article className="flex flex-col items-center">
      <h1 className="text-[4em] font-primary">Plan interactif</h1>
      <Outlet />
      <p className="mt-4"><span className="text-2xl font-bold">P</span> : Peseuse</p>
      <p><span className="text-2xl font-bold">E</span> : Emballeuse</p>
    </article>
  )
}

export default App
