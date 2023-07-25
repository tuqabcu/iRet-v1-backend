// Copyright ©,2023, Birmingham City University

var Material = require("../models/Material");
var utilities = require("../utils/utilities");
const mongoose = require("mongoose");

exports.create = async function (req, res) {
  try {
    let body = req.body;

    if (!body.type)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });

    let material = await new Material(body).save();
    res.json(material);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};

exports.getMaterials = async function (req, res) {
  try {
    let criteria = {};
    if (req.query.type) {
      criteria["type"] = req.query.type;
    }

    let result = await Material.find(criteria);
    let materials = [];
    result.map((item) => {
      switch (item.type) {
        case "AirGap":
          materials.push(
            (({ _id, type, name, thermalResistance }) => ({
              _id,
              type,
              name,
              thermalResistance,
            }))(item)
          );
          break;
        case "WindowGas":
          materials.push(
            (({ _id, type, name, gasType, thickness }) => ({
              _id,
              type,
              name,
              gasType,
              thickness,
            }))(item)
          );
          break;
        case "Glazing":
          materials.push(
            (({
              _id,
              type,
              name,
              opticalDataType,
              thickness,
              solarTransmittance,
              frontSolarReflectance,
              backSolarReflectance,
              visibleTransmittance,
              frontVisibleReflectance,
              backVisibleReflectance,
              infraredTransmittance,
              frontInfraredHemispherical,
              backInfraredHemispherical,
              conductivity,
            }) => ({
              _id,
              type,
              name,
              opticalDataType,
              thickness,
              solarTransmittance,
              frontSolarReflectance,
              backSolarReflectance,
              visibleTransmittance,
              frontVisibleReflectance,
              backVisibleReflectance,
              infraredTransmittance,
              frontInfraredHemispherical,
              backInfraredHemispherical,
              conductivity,
            }))(item)
          );
          break;
        case "Mas":
          materials.push(
            (({
              _id,
              type,
              name,
              thickness,
              conductivity,
              density,
              specificHeat,
              roughness,
              thermalAbsorptance,
              solarAbsorptance,
              visibleAbsorptance,
            }) => ({
              _id,
              type,
              name,
              thickness,
              conductivity,
              density,
              specificHeat,
              roughness,
              thermalAbsorptance,
              solarAbsorptance,
              visibleAbsorptance,
            }))(item)
          );
          break;
        case "NoMas":
          materials.push(
            (({
              _id,
              type,
              name,
              thermalResistance,
              roughness,
              thermalAbsorptance,
              solarAbsorptance,
              visibleAbsorptance,
            }) => ({
              _id,
              type,
              name,
              thermalResistance,
              roughness,
              thermalAbsorptance,
              solarAbsorptance,
              visibleAbsorptance,
            }))(item)
          );
          break;
      }
    });
    res.json(materials);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};
