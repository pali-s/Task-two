import { useGetUser } from "../../queries/user/useGetUsers"

const DashboardDefault = () => {
  const {data, isLoading, error}= useGetUser();

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email:{data.email}</p>
    </div>
  )
}

export default DashboardDefault