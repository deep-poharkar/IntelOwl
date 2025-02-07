# Generated by Django 4.1.9 on 2023-06-28 14:33

import datetime

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_app", "0033_alter_parameter_unique_together"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="scan_check_time",
            field=models.DurationField(
                blank=True, default=datetime.timedelta(days=1), null=True
            ),
        ),
        migrations.AddField(
            model_name="job",
            name="scan_mode",
            field=models.IntegerField(
                choices=[(1, "Force New Analysis"), (2, "Check Previous Analysis")],
                default=2,
            ),
        ),
    ]
