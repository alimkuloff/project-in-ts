import { Card, Button } from 'antd';
import { Car } from '../../types/dataTypes';
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { toggleLike } from '../../redux/slices/likes-slice';

const { Meta } = Card;

const CardComponent = ({ car }: { car: Car }) => {
  const dispatch = useAppDispatch();
  const likedCars = useAppSelector((state) => state.likes.likedCars);

  const isLiked = likedCars.includes(car._id);

  const handleLike = () => {
    dispatch(toggleLike(car._id));
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img style={{ width: 200 }} alt={car.description} src={car.thumbnail} />}
      actions={[
        <Button
          key="like"
          type={isLiked ? 'primary' : 'default'}
          onClick={handleLike}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
      ]}
    >
      <Meta title={car.name} description={parse(car.description)} />
    </Card>
  );
};

export default CardComponent;
