/* eslint-disable no-unused-vars */
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './index.css';

interface CustomSliderProps {
  handleChange: (value: any) => void;
}

export const CustomSlider = ({ handleChange }: CustomSliderProps) => {
  const marks = {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  };

  return (
    <Slider
      range
      min={0}
      marks={marks}
      step={null}
      onChange={handleChange}
      defaultValue={0}
      allowCross={false}
      pushable
      draggableTrack
    />
  );
};
