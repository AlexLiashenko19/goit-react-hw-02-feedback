import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackBtn } from './FeedbackBtn/FeedbackBtn';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = event => {
    this.setState(prevState => {
      return {
        [event]: prevState[event] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = total => {
    return total && Math.round((100 / total) * this.state.good);
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackBtn
            options={Object.keys(this.state)}
            OnLeaveFeedback={this.handleClick}
          ></FeedbackBtn>
        </Section>
        {good || neutral || bad ? (
          <Section title="Statistick">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage}
            ></Statistics>
          </Section>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </div>
    );
  }
}
