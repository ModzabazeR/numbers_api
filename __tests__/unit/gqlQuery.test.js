const { graphql } = require("graphql");
const { schema } = require("../../graphql/schema/schema");

describe("Test getNumberFacts queries", () => {
  it("Should return the correct query result", async () => {
    const query = `
            {
                getNumberFacts(number: 1) {
                    trivia
                    math
                    year
                }
            }
        `;

    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts;

    expect(Object.keys(data).length).toEqual(3);
    expect(data.trivia.length).toEqual(4);
    expect(data.math.length).toEqual(4);
    expect(data.year.length).toEqual(4);
  });

  it("If number does not have fact, response includes default message ", async () => {
    const query = `
            {
                getNumberFacts(number: 299) {
                    trivia
                }
            }
        `;
    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts;

    expect(Object.keys(data).length).toEqual(1);
    expect(data.trivia[0]).toEqual(
      expect.stringContaining(
        "Submit one at github.com/rithmschool/numbers_api",
      ),
    );
  });

  it("Result includes specific entry", async () => {
    const query = `
            {
                getNumberFacts(number: 2010) {
                    math
                }
            }
        `;
    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts;

    expect(Object.keys(data).length).toEqual(1);
    expect(data.math[0]).toEqual(
      "the number of trees on 15 vertices with diameter 7",
    );
  });

  it("Should return the correct date for first leap year", async () => {
    const query = `
    {
        getNumberFacts(number: 60) {
            date
        }
    }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts.date;

    expect(data[0]).toEqual(expect.stringContaining("February 29th"));
    expect(data[0]).toEqual(
      expect.not.stringContaining(
        "Submit one at github.com/rithmschool/numbers_api",
      ),
    );
    expect(data.length).toBeGreaterThan(1);
  });

  it("Should return the correct date for negative numbers", async () => {
    const query = `
    {
        getNumberFacts(number: -2) {
            date
        }
    }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts.date;

    expect(data[0]).toEqual(expect.stringContaining("December 29th"));
    expect(data[0]).toEqual(
      expect.not.stringContaining(
        "Submit one at github.com/rithmschool/numbers_api",
      ),
    );
    expect(data.length).toBeGreaterThan(1);
  });

  it("Should return the correct date for numbers past first year", async () => {
    const query = `
    {
        getNumberFacts(number: 4000) {
            date
        }
    }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    const data = result.data.getNumberFacts.date;

    expect(data[0]).toEqual(expect.stringContaining("December 13th"));
    expect(data[0]).toEqual(
      expect.not.stringContaining(
        "Submit one at github.com/rithmschool/numbers_api",
      ),
    );
    expect(data.length).toBeGreaterThan(1);
  });
});
