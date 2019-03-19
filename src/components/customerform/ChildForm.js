import React, { Component } from "react";

//=========== Number Format ============//
import NumberFormat from "react-number-format";
//======================================//

// import "./Style.scss";
import "./StyleForm.css";

class DynamicForm extends Component {
  state = {};
  //-=> Submit : Semua state yang dihasilkan yang nantinya dikirim ke Parent ============//
  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  //-=> On-Change : Setiap kali form diedit ============//
  onChange = async (e, key, type = "single") => {
    // console.log(`${key} changed ${e.target.value} type ${type}`);
    //=========== Handle type single value (Text/textarea/number/date/radio) ============//
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else if (type === "number") {
      // let number = parseInt(e.target.value);
      this.setState({
        //-=> EDIT TYPE NUMBER OR STRING HERE ================================
        // [key]: number
        [key]: e.target.value
      });
    }
  };

  handleValue = (key, value, statekey) => {
    if (statekey === undefined) {
      this.setState({
        [key]: value
      });
    }
  };

  //-=> Fungsi Rendering Berdasarkan model yang diterima (model berasal dari JSON / konversi XML ke JSON) ============//
  renderForm = () => {
    let model = this.props.model;

    let formUI = [];

    if (typeof model.form === "object") {
      let allRow = model.form.rows[0].row;
      for (let i = 0; i < allRow.length; i++) {
        let pushRow = [];

        let inRow = allRow[i].columns[0].column;

        for (let j = 0; j < inRow.length; j++) {
          let rowColstyle = inRow[j].colstyle;
          let rowLabel = inRow[j].label;
          let rowType = inRow[j].datatype;
          let rowValue = inRow[j].value;
          let rowKey = inRow[j].keyfield;
          let rowRequired = inRow[j].required;

          if (
            rowValue !== undefined &&
            (rowType + [] === "text" ||
              rowType + [] === "number" ||
              rowType + [] === "date")
          ) {
            this.handleValue(rowKey, rowValue + [], this.state[rowKey]);
          }

          if (inRow.length === 3) {
            let colMd = "col-md-4";
            pushRow.push(
              this.handleLabel(
                colMd,
                rowColstyle,
                rowLabel,
                rowType,
                rowKey,
                rowRequired,
                rowValue
              )
            );
          } else if (inRow.length === 2) {
            let colMd = "col-md-6";
            pushRow.push(
              this.handleLabel(
                colMd,
                rowColstyle,
                rowLabel,
                rowType,
                rowKey,
                rowRequired,
                rowValue
              )
            );
          } else if (inRow.length === 1) {
            let colMd = "col-md";
            pushRow.push(
              this.handleLabel(
                colMd,
                rowColstyle,
                rowLabel,
                rowType,
                rowKey,
                rowRequired,
                rowValue
              )
            );
          }
        }
        formUI.push(
          <div key={"group-row" + i} className="form-row">
            {pushRow}
          </div>
        );
      }
    }
    return formUI;
  };

  handleLabel = (colmd, colstyle, label, type, key, required, value) => {
    return (
      <div
        key={"input-row-" + key}
        className={
          colstyle !== undefined
            ? "form-group " + colstyle
            : "form-group " + colmd
        }
      >
        <label>
          <b>{label}</b>
        </label>
        {this.handleInput(type, value, key, required)}
      </div>
    );
  };

  handleInput = (type, value, key, required) => {
    let inputUI;

    if (type + [] === "text" || type + [] === "date") {
      inputUI = (
        <input
          type={type}
          required={required + [] === "true" ? true : false}
          className="form-control"
          defaultValue={this.state[key]}
          onChange={e => {
            this.onChange(e, key);
          }}
        />
      );
    }
    if (type + [] === "number") {
      inputUI = (
        <NumberFormat
          className="form-control"
          isNumericString={true}
          allowNegative={false}
          decimalSeparator=""
          value={this.state[key]}
          onChange={e => {
            this.onChange(e, key, "number");
          }}
        />
      );
    }
    if (type + [] === "textarea") {
      inputUI = (
        <textarea
          required={required + [] === "true" ? true : false}
          className="form-control"
          value={this.state[key]}
          onChange={e => {
            this.onChange(e, key);
          }}
        />
      );
    }
    return inputUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";
    return (
      <div className="container">
        <h3>{title}</h3>
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DynamicForm;