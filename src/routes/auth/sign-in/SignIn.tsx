import { Typography, Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { useSignInMutation } from "../../../redux/api/auth-api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [signIn, { data, isSuccess }] = useSignInMutation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await signIn(values);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("token", data.token);
      navigate(`/dashboard`);
    }
  }, [isSuccess, data, navigate]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="w-[450px] min-h-[300px] bg-white rounded-lg p-7">
        <Typography className="text-4xl text-center font-bold tracking-wider">
          Sign In
        </Typography>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              layout="vertical"
              wrapperCol={{ offset: 0, span: 24 }}
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <br />
            <Form.Item<FieldType>
              layout="vertical"
              wrapperCol={{ offset: 0, span: 24 }}
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <br />
            <Form.Item wrapperCol={{ offset: 9, span: 24 }}>
              <Button
                style={{ backgroundColor: "#111" }}
                type="primary"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
