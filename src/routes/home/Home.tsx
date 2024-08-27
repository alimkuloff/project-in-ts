import Cars from "../../components/cars/Cars";
import { useGetCarsQuery } from "../../redux/api/car-api"

const Home = () => {
    const {data, isLoading} = useGetCarsQuery();

    console.log(data?.payload)

  return (
    <div>
        <Cars data={data?.payload} isLoading={isLoading} title={"Popular cars"} />
    </div>
  )
}

export default Home