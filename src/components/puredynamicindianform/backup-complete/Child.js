import React, { Component } from "react";

//=========== Number Format ============//
import NumberFormat from "react-number-format";
//======================================//

import "./Style.css";

var globalOnce = 1;
var editStatus = false;
class DynamicForm extends Component {
  state = {};

  //-=> Submit : Semua state yang dihasilkan yang nantinya dikirim ke Parent ============//
  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  //-=> On-Change : Setiap kali form diedit ============//
  onChange = async (e, key, type = "single", defcheck) => {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    //=========== Handle type single value (Text/textarea/number/date/radio) ============//
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      //=========== Handle Tipe Multiple value (Checkbox) ============//

      if (this.state[key] === undefined) {
        alert("undefined cuuuy");
      }

      if (e.target.checked === true) {
        alert("insert");
        e.target.checked = true;
        editStatus = true;
        this.setState({
          [key]: [...this.state[key], e.target.value]
        });
        console.log(this.state[key]);
      } else if (e.target.checked === false) {
        alert("remove");
        e.target.checked = false;
        editStatus = true;
        function arrayRemove(arr, value) {
          return arr.filter(function(ele) {
            return ele !== value;
          });
        }

        let minusres = arrayRemove(this.state[key], e.target.value);

        await this.setState({
          [key]: minusres
        });
      }
    }
  };

  //-=> yang bertugas mengisi default value checkbox jadi [] ==============//
  handleUndef = (key, undef, valueA, valueB) => {
    console.log(valueA, valueB);
    if (undef === undefined) {
      this.setState({
        [key]: []
      });
    }
  };

  //-=> Yang Handle Tiap inputan punya Value bawaan atau tidak ============//
  handleValue = (key, undef, value) => {
    console.log(value);
    if (undef === undefined && value !== undefined) {
      // alert("handlevalue alert");
      let thatvalue = value + [];
      this.setState({
        [key]: thatvalue
      });
    }
  };

  //-=> Yang Handle Checkboxnya ter-centang atau tidak ============//
  handleValueCheckBox = (emvalue, ovalue, key, undef) => {
    let valueelement = emvalue[0].element || ["a", "b"];

    if (globalOnce > 0 && emvalue + [] === ovalue + [] && undef + [] === "") {
      globalOnce--;
      alert("kotak? " + key, undef, ovalue);
      console.log(key);
      let sendvalue = ovalue + [];
      this.setState({
        [key]: [...this.state[key], sendvalue]
      });
      return true;
    } else if (editStatus === false && undef + [] === "") {
      // alert("spoiler");

      let ceking;
      valueelement.forEach(function myKonsol(value) {
        console.log(value, ovalue + []);
        if (value === ovalue + []) {
          // alert("nih ada yang sama : " + value);
          console.log(key);

          console.log(ovalue);

          ceking = true;
        }
      });
      if (ceking === true) {
        // alert(ovalue + " " + key);
        this.handleValueElement(key, ovalue);
      }
      return ceking;
    }
  };

  //-=> Yang Menghandle this.state[key] Value Bawaan Checkbox di ============//
  handleValueElement = (key, value) => {
    let realvalue = value + [];
    this.setState(previousState => ({
      [key]: [...previousState[key], realvalue]
    }));
  };

  //-=> Fungsi Rendering Berdasarkan model yang diterima (model berasal dari JSON / konversi XML ke JSON) ============//
  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map(m => {
      let key = m.keyfield;

      let type = m.type + [] || "text" || m.type;
      let value = m.value;
      let props = m.props || {};
      let options = m.options || [0];

      //If Input ?????
      let input = (
        <input
          required={m.required}
          ref={key => {
            this[m.keyfield] = key;
          }}
          className="form-input"
          type={type}
          key={"input" + m.keyfield}
          onChange={e => {
            this.onChange(e, key);
          }}
        />
      );
      //End If

      //=========== Number Format ============//
      if (type === "number") {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }

        //--== WARNING HERE ==--
        this.handleValue(key, this.state[key], m.value);
        //--== END WARNING ==--

        input = (
          <NumberFormat
            isNumericString={true}
            allowNegative={false}
            required={requireds}
            placeholder={m.placeholder}
            ref={key => {
              this[m.keyfield] = key;
            }}
            className="form-input"
            value={this.state[key]}
            key={"input" + m.keyfield}
            onChange={e => {
              this.onChange(e, key);
            }}
          />
        );
      }
      //=========== END Number Format ============//

      //=========== Text / Date Format ============//
      if (
        type === "date" ||
        type === "text" ||
        type === undefined ||
        type === null ||
        type === ""
      ) {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }
        console.log(value);
        console.log(([value] + []).length);
        console.log(this.state[key]);

        //--== WARNING HERE ==--
        this.handleValue(key, this.state[key], m.value);
        //--== END WARNING ==--

        input = (
          <input
            required={requireds}
            placeholder={m.placeholder}
            ref={key => {
              this[m.keyfield] = key;
            }}
            className="form-input"
            value={this.state[key]}
            type={type}
            key={"input" + m.keyfield}
            onChange={e => {
              this.onChange(e, key);
            }}
          />
        );
      }

      //=========== Textarea Format ============//
      if (type === "textarea") {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }
        //--== WARNING HERE ==--
        this.handleValue(key, this.state[key], m.value);
        //--== END WARNING ==--
        console.log(requireds);
        input = (
          <textarea
            required={requireds}
            placeholder={m.placeholder}
            ref={key => {
              this[m.keyfield] = key;
            }}
            cols={m.cols}
            rows={m.rows}
            value={this.state[key]}
            className="form-input"
            type={type}
            key={"input" + m.keyfield}
            onChange={e => {
              this.onChange(e, key);
            }}
          />
        );
      }
      //=========== END Textarea ============//

      //=========== Select Format ============//
      if (type === "select") {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }
        //--== WARNING HERE ==--
        this.handleValue(key, this.state[key], m.value);
        //--== END WARNING ==--
        input = options.map(o => {
          console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              key={o.keyfield}
              value={o.value}
            >
              {o.label}
            </option>
          );
        });

        // console.log("Select default: ", value);
        input = (
          <select
            defaultValue=""
            value={this.state[key]}
            required={requireds}
            onChange={e => {
              this.onChange(e, m.keyfield);
            }}
          >
            <option value="" disabled>
              {"-= Select " + m.label + " =-"}
            </option>
            {input}
          </select>
        );
      }
      //=========== END Select ============//

      //=========== Radio Format ============//
      if (type === "radio") {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }

        input = m.options.map(o => {
          console.log("select: ", o.value, value);
          //--== WARNING HERE ==--
          this.handleValue(key, this.state[key], m.value);
          //--== END WARNING ==--

          let varchecked;
          console.log(m.value, o.value);
          if (m.value + [] === o.value + []) {
            varchecked = true;
          }
          // console.log(varchecked);

          return (
            <React.Fragment key={"fr" + o.keyfield}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                defaultChecked={varchecked}
                value={o.value}
                required={requireds}
                onChange={e => {
                  this.onChange(e, o.name);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }
      //=========== END Radio Format ============//

      //=========== Checkbox Format ============//
      if (type === "checkbox") {
        input = m.options.map(o => {
          //--== WARNING HERE ==--
          this.handleUndef(key, this.state[key], m.value, o.value);
          //--== END WARNING ==--

          let advrequired;

          let panjang = this.state[key] || [""];

          if (
            m.required + [] === "true" ||
            m.require === "true" ||
            m.require === true
          ) {
            if (panjang.length === 0) {
              advrequired = true;
            } else {
              advrequired = false;
            }
          }

          return (
            <React.Fragment key={"cfr" + o.keyfield}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={o.checked}
                defaultChecked={this.handleValueCheckBox(
                  m.value,
                  o.value,
                  m.keyfield,
                  this.state[key]
                )}
                value={o.value}
                required={advrequired}
                onClick={e => {
                  this.onChange(e, m.keyfield, "multiple");
                }}
                // onChange={e => {
                //   this.onChange(e, m.key, "multiple", defcheck);
                // }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
              <br />
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }
      //=========== END Checkbox ============//

      return (
        <div key={key + []}>
          <label
            className="form-label"
            key={"label" + m.keyfield}
            htmlFor={m.keyfield}
          >
            <b> {m.label} </b>
          </label>
          {input}
        </div>
      );
    });
    return formUI;
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
            <button type="submit" className="registerbtn">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DynamicForm;
