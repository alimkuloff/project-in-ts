import React, { useEffect, useState } from 'react';
import { Flex, Input, Typography, Button } from 'antd';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../../redux/api/auth-api';
import { useSearchParams, useNavigate } from 'react-router-dom';

type OTPProps = React.ComponentProps<typeof Input.OTP>;

interface OtpProps {
  email: string;  
}

const Otp: React.FC<OtpProps> = () => {
  const [resentCount, setResetCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading, isError, isSuccess }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const navigate = useNavigate();  // useNavigate xookini qo'shish

  const onChange: OTPProps['onChange'] = (e) => {
    console.log(e);
    setOtp(e);
  };

  useEffect(() => {
    if (searchParams.get("email")) {
      setEmail(atob(searchParams.get("email")!));
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    try {
      const response = await verifyOtp({ email, otp }).unwrap();
      if (response) {
        console.log('OTP Verified:', response);
        navigate('/auth/sign-in');  
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const sharedProps: OTPProps = {
    value: otp,
    onChange,
  };

  const handleResend = async () => {
    resendOtp({ email });
    setResetCount(resentCount + 1);
    setTimer(60);
  };

  useEffect(() => {
    let timerInterval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);

  }, [timer, resentCount]);

  return (
    <div className='w-full h-screen bg-[#e4e4e4] flex items-center justify-center'>
      <div className='w-[400px] min-h-[250px] bg-white rounded-lg p-7 flex items-center justify-center'>
        <Flex gap="middle" align="flex-start" vertical>
          <div>
            <Typography className='text-center text-2xl'>Enter One Time Password</Typography>
            <Typography className='text-center text-[12px] text-[gray]'>We sent it to {email}</Typography>
          </div>
          <div className='w-full text-center'>
            <Input.OTP className='w-full text-center' formatter={(str) => str.toUpperCase()} {...sharedProps} />
          </div>
          <Button
            type="primary"
            className='w-full'
            loading={isLoading}
            onClick={handleSubmit}
            disabled={!otp || isLoading}
          >
            Verify
          </Button>
          <Button
            type="primary"
            className='w-full'
            loading={isLoading}
            htmlType='button'
            onClick={handleResend}
            disabled={timer > 0}
          >
            Resend {timer ? "in " + timer + "s" : ""}
          </Button>
          {isError && <Typography className='text-red-500 text-center'>OTP verification failed.</Typography>}
          {isSuccess && <Typography className='text-green-500 text-center'>OTP verified successfully!</Typography>}
        </Flex>
      </div>
    </div>
  );
};

export default Otp;
