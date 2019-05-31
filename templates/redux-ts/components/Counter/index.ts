import { connect } from "react-redux";

import { increase, decrease, asyncIncrease } from "../../actions/counter";
import { AppState } from "../../store/reducers";

import Counter from "./Counter";

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  increase,
  decrease,
  asyncIncrease,
};

export interface CounterProps {
  counter: number;
  increase: (value: number) => void;
  decrease: (value: number) => void;
  asyncIncrease: (value: number) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);