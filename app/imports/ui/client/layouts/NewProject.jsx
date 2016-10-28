import React from 'react';

export const NewProject = () =>
<div className="row">
  {/* left column */}
  <div className="col-md-12">
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">Project description</h3>
      </div>
      {/* /.box-header */}
      <div className="box-body pad">
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" placeholder="Enter ..." />
        </div>
        {/* Date range */}
        <div className="form-group">
        <label>Start:</label>
        <div className="input-group date">
          <div className="input-group-addon">
            <i className="fa fa-calendar" />
          </div>
          <input type="date" className="form-control pull-right datepicker"/>
        </div>
        {/* /.input group */}
      </div>
      <div className="form-group">
        <label>End:</label>
        <div className="input-group date">
          <div className="input-group-addon">
            <i className="fa fa-calendar" />
          </div>
          <input type="date" className="form-control pull-right datepicker"/>
        </div>
        {/* /.input group */}
      </div>
        {/* Public Private */}
        <div className="form-group">
          <label>Visibility level:</label>
          <div className="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
              Public
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
              Private
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" rows="5"></textarea>
        </div>
        <div className="form-group">
          <label>Administrator:</label>
          <input type="text" className="form-control" placeholder="Pseudo" disabled/>
          <p className="help-block">This project will be created with you as the Administrator.
          Once the project exists, you may choose an Administrator from among the project members.</p>
        </div>
        <button className="btn btn-flat center-block" onClick={this.handleSubmit}>
          Submit
        </button>
          </div>
        </div>
        {/* /.box */}
      </div>
      {/* /.row */}
    </div>
;
