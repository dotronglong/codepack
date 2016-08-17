import cli from "../lib/cli";
var expect = require("chai").expect;

describe("cli.js", function() {
  beforeEach(() => {
    cli.NEW_LINE = true;
  });

  it("[error] should print "." in red color", function() {
    cli.NEW_LINE = false;
    cli.error(".");
  });
  it("[success] should print "." in green color", function() {
    cli.NEW_LINE = false;
    cli.success(".");
  });
  it("[warning] should print "." in orange color", function() {
    cli.NEW_LINE = false;
    cli.warning(".");
  });
  it("[info] should print "." in blue color", function() {
    cli.NEW_LINE = false;
    cli.info(".");
  });
});