import os
import glob
import itertools

from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from django.core.files import File
from django.contrib.auth import get_user_model

from images.models import Image


def get_files_by_extension(root, *extensions):
    return itertools.chain.from_iterable(
        glob.iglob(os.path.join(root, "**/*." + ext), recursive=True)
        for ext in extensions)


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('user')
        parser.add_argument('dir')

    def handle(self, *args, **options):
        username = options['user']
        try:
            user = get_user_model().objects.get(username=username)
        except ObjectDoesNotExist:
            raise CommandError("No user found for name {}".format(username))

        for file in get_files_by_extension(options['dir'], "jpg", "png"):
            image = Image(image=File(open(file, 'rb')),
                          user=user,
                          title=os.path.basename(file))
            image.save()
            self.stdout.write(image.title)
