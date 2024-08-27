import { Button, Form } from "antd";

export interface Props {
    current: number
    handleBack: () => void
    handleNext: () => void
}

const NextBack = ({current, handleBack} : Props) => {
  return (
    <div className="flex justify-between">
      <Button disabled={current === 0} type="primary" onClick={handleBack}>
        Back
      </Button>
      {current < 3 ? (
       <Form.Item>
         <Button  htmlType="submit" type="primary">
          Next
        </Button>
       </Form.Item>
      ) : (
        <Button type="primary">Create</Button>
      )}
    </div>
  );
};

export default NextBack;
