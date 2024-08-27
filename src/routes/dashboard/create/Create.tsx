import { Steps } from 'antd';
import { useState } from 'react';
import BasicInfo from './basic-info/BasicInfo';
import VisualInfo from './visual-info/VisualInfo';


const Create = () => {
  const [current, setCurrent] = useState<number>(0);

  const handleNext = () => {
    if(current < 3){
      setCurrent(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if(current > 0){
      setCurrent(prev => prev - 1)
    }
  }

  const components = [
    {
      id: 0,
      content: (current: number, handleNext: () => void, handleBack: () => void) => <BasicInfo current={current} handleNext={handleNext} handleBack={handleBack}/>
    },
    {
      id: 1,
      content: (current: number, handleNext: () => void, handleBack: () => void) =>  <VisualInfo current={current} handleNext={handleNext} handleBack={handleBack} />
    }
  ]

  return (
    <div>
      
      <Steps
      size="small"
      current={current}
      items={[
        {
          title: 'Basic info',
        },
        {
          title: 'Visual Info',
        },
        {
          title: 'Technical Info',
        },
        {
          title: 'Check in',
        }
      ]}
    />
      <div className='h-[500px] flex py-10'>
        {
         current < components.length &&  components[current].content(current, handleNext, handleBack)
        }
      </div>

     
    </div>
  )
}

export default Create