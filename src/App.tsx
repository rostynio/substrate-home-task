import { Route, Routes } from 'react-router-dom'
import { ApplicationPage } from './pages/ApplicationPage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoanPage } from './pages/LoanPage'
import { LoansPage } from './pages/LoansPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/loans" element={<LoansPage />} />
      <Route path="/loans/:loanId" element={<LoanPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/applications/:applicationId" element={<ApplicationPage />} />
    </Routes>
  )
}
