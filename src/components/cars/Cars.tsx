import { Typography } from "antd";
import CardComponent from "../card/Card";
import { Car } from "../../types/dataTypes";

const { Title } = Typography;

type Props = {
  title: string,
  data: Car[] | undefined,
  isLoading: boolean
};

const Cars = ({ data, title, isLoading }: Props) => {
  return (
    <div>
      <Title level={2}>{title}</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map(car => (
            <CardComponent key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;
