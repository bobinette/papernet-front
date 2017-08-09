import React from 'react';

const HomeEmptyState = () => (
  <div className="HomeView container">
    <div className="col-md-8 offset-md-2">
      <h3>Time to create your first paper!</h3>
      <p>It looks like your list is empty. To add papers to your list in Papernet, you have two options:</p>
      <ul>
        <li>
          you can directly create a new paper from the <strong>New</strong> button in the navigation bar, or
        </li>
        <li>
          you can head to the <strong>Search</strong> tab, still in the navigation bar,
          and import papers from there.
        </li>
      </ul>
      <p>
      Happy papering!
      </p>
    </div>
  </div>
);

export default HomeEmptyState;
