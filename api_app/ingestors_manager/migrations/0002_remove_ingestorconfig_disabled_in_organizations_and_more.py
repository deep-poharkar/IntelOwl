# Generated by Django 4.1.10 on 2023-07-31 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ingestors_manager", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="ingestorconfig",
            name="disabled_in_organizations",
        ),
        migrations.AddField(
            model_name="ingestorreport",
            name="max_size_report",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
