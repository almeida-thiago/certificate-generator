## PDF Certificate generator

Easy generates certificates in PDF format.

`POST /require-certificate - JSON`

|Param                |Description                                              |
|:-------------------:|---------------------------------------------------------|
|`lang`               |Lang name (pt-br or en-us).                              |
|`backgound`          |Backgroun image url.                                     |
|`fontFamily`         |Font name.                                               |
|`name`               |Paticipant name. `required`                              |
|`institute`          |Institute name. `required`                               |
|`event.title`        |Event title. `required`                                  |
|`event.titleGender`  |Title event gender for automatic text (pt-br). `required`|
|`event.hours`        |Total hours of event. `required`                         |
|`event.date`         |Date of event. `required`                                |
|`text`               |Custom certificate text, use \[NAME\] to replace name.   |
|`signers: []`        |Array of signers max of 3. `required`                    |
|`signers.name`       |Signer name `required`                                   |
|`signers.description`|Signer description `required`                            |

### Response

```json
{
  "success": true,
  "certificate": "CERTIFICATE LINK URL"
}
```

```json
{
  "error": true,
  "message": "Error message."
}
```

#### Post exemple

```json
  {
    "lang": "pt-br",
    "backgound": null,
    "fontFamily": "arial",
    "name": "Fulano de Tal",
    "institute": "Institute",
    "event": {
      "title": "Curso para criar certificados",
      "titleGender": "m",
      "hours": 4,
      "date": "10 de agosto de 2010"
    },
    "text": "Este é um texto customizado para certificar [NAME].",
    "signers": [
      {
        "name": "Fulano de Tal 2",
        "description": "Description"
      }
    ]
  }
```

### Environment variables

|Varible    |Data                        |
|:---------:|----------------------------|
|APP_NAME   |Application name            |
|APP_VERSION|Application version         |
|URL_ACCESS |Application url access point|
|PORT       |Application access port     |