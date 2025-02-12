# Generated by Django 4.1.9 on 2023-05-18 08:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("analyzers_manager", "0027_phishing_army"),
    ]

    operations = [
        migrations.AlterField(
            model_name="analyzerconfig",
            name="name",
            field=models.CharField(
                max_length=50,
                primary_key=True,
                serialize=False,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        "^\\w+$", "Your name should match the [A-Za-z0-9_] characters"
                    )
                ],
            ),
        ),
    ]
