import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchHystagramAsync = createAsyncThunk(
  "user/getSearchHystagram",
  async (action, thunkAPI) => {
    try {
      const responce = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).accessToken
            }`,
          },
          body: JSON.stringify({
            "issueDateInterval": {
              "startDate": action.startDate,
              "endDate": action.endDate,
            },
            "searchContext": {
              "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": action.inn,
                    "maxFullness": action.maxFullness,
                    "inBusinessNews": null
                  }
                ],
                "onlyMainRole": action.onlyMainRole,
                "tonality": "any",
                "onlyWithRiskFactors": action.onlyWithRiskFactors,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "themesFilter": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchArea": {
              "includedSources": [],
              "excludedSources": [],
              "includedSourceGroups": [],
              "excludedSourceGroups": []
            },
            "attributeFilters": {
              "excludeTechNews": action.excludeTechNews,
              "excludeAnnouncements": action.excludeAnnouncements,
              "excludeDigests": action.excludeDigests
            },
            "similarMode": "duplicates",
            "limit": action.limit,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
              "totalDocuments",
              "riskFactors"
            ]
          }),
        }
      );
      const data = await responce.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getSearchObjectsAsync = createAsyncThunk(
  "user/getSearchObjectsAsync",
  async (action, thunkAPI) => {
    try {
      const responce = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/objectsearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).accessToken
            }`,
          },
          body: JSON.stringify({
            "issueDateInterval": {
              "startDate": action.startDate,
              "endDate": action.endDate,
            },
            "searchContext": {
              "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": action.inn,
                    "maxFullness": action.maxFullness,
                    "inBusinessNews": null
                  }
                ],
                "onlyMainRole": action.onlyMainRole,
                "tonality": "any",
                "onlyWithRiskFactors": action.onlyWithRiskFactors,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "themesFilter": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchArea": {
              "includedSources": [],
              "excludedSources": [],
              "includedSourceGroups": [],
              "excludedSourceGroups": []
            },
            "attributeFilters": {
              "excludeTechNews": action.excludeTechNews,
              "excludeAnnouncements": action.excludeAnnouncements,
              "excludeDigests": action.excludeDigests
            },
            "similarMode": "duplicates",
            "limit": action.limit,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
              "totalDocuments",
              "riskFactors"
            ]
          }),
        }
      );
      const data = await responce.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getDocumentsSearchAsync = createAsyncThunk(
  "user/getDocumentsSearchAsync",
  async (action) => {
    try {
      const responce = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token")).accessToken
            }`,
          },
          body:JSON.stringify({
            ids: action
          }),
        }
      );
      const data = await responce.json();
      return data;

    } catch (error) {
      return error;
    }
  }
);
