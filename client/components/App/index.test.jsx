const React = require('react');
const App = require('./');

describe('<App />', () => {
  const wrapper = shallow(<App />);

  it('should be of type <h1>', () => {
    expect(wrapper.type()).to.eql('h1');
  });

  it('should say "Good to go!"', () => {
    expect(wrapper.contains('Good to go!')).to.equal(true);
  });
});
